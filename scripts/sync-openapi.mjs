// Regenerate the shared catalogue from the reviewed Shotstack OpenAPI snapshots.
// --refresh downloads current upstream documents for review; it never publishes.
import fs from 'node:fs';
import crypto from 'node:crypto';
const proofURL=new URL('../src/tools/api-source.json',import.meta.url);
const previous=JSON.parse(fs.readFileSync(proofURL,'utf8'));
const refresh=process.argv.includes('--refresh');
const hash=v=>crypto.createHash('sha256').update(v).digest('hex');
const aliases={postRender:'render',getRender:'get_render',postTemplate:'create_template',getTemplates:'list_templates',getTemplate:'get_template',putTemplate:'update_template',deleteTemplate:'delete_template',postTemplateRender:'render_template',probe:'probe_media',postGenerate:'generate_asset',getGenerate:'get_generated_asset',getModels:'list_models',getModel:'get_model',getAsset:'get_asset',deleteAsset:'delete_asset',getAssetByRenderId:'get_asset_by_render_id',postServeAsset:'transfer_asset',postSource:'ingest_source',getSources:'list_sources',getSource:'get_source',deleteSource:'delete_source',getUploadSignedUrl:'create_upload_url_file'};
function strip(v){if(Array.isArray(v))return v.map(strip);if(typeof v==='string')return v.replace(/https?:\/\/[^\s`"'<>]+/g,u=>/[?&](AWSAccessKeyId|Signature|x-amz-security-token|X-Amz-Signature|token)=/i.test(u)?'[temporary signed credential URL omitted]':u);if(!v||typeof v!=='object')return v;return Object.fromEntries(Object.entries(v).filter(([k])=>!['example','examples'].includes(k)).map(([k,x])=>[k,strip(x)]));}
function clean(v){if(Array.isArray(v))return v.map(clean);if(!v||typeof v!=='object')return v;const o=Object.fromEntries(Object.entries(v).filter(([k])=>!['example','examples','discriminator','xml','readOnly','writeOnly'].includes(k)&&!k.startsWith('x-')).map(([k,x])=>[k,clean(x)]));if(o.$ref)o.$ref=o.$ref.replace('#/components/schemas/','#/$defs/');for(const [key,bound]of[['exclusiveMinimum','minimum'],['exclusiveMaximum','maximum']])if(typeof o[key]==='boolean'){const flag=o[key];delete o[key];if(flag&&bound in o){o[key]=o[bound];delete o[bound];}}if(o.nullable){delete o.nullable;if(o.type)o.type=typeof o.type==='string'?[o.type,'null']:[...o.type,'null'];else return {anyOf:[o,{type:'null'}]};}else delete o.nullable;
  // The vendor Asset union otherwise rejects every valid branch.
  if(o.oneOf&&o.additionalProperties===false&&!o.properties){delete o.additionalProperties;o.unevaluatedProperties=false;}return o;}
function reachable(schema,defs){const found=new Set();function walk(v){if(!v||typeof v!=='object')return;if(v.$ref){if(!v.$ref.startsWith('#/$defs/'))throw new Error('Unsupported request reference');const n=v.$ref.slice(8);if(!defs[n])throw new Error('Missing definition '+n);if(!found.has(n)){found.add(n);walk(defs[n]);}}for(const [k,x]of Object.entries(v))if(k!=='$defs')walk(x);}walk(schema);return Object.fromEntries(Object.entries(defs).filter(([n])=>found.has(n)));}
const operations=[],sources={};
for(const group of ['edit','serve','ingest']){
 const source=`https://shotstack.io/docs/api/api.${group}.json`,snapshot=new URL(`./shotstack-${group}.snapshot.json`,import.meta.url);let api,originalSha256=previous.sources[group].originalSha256;
 if(refresh){const res=await fetch(source,{signal:AbortSignal.timeout(30000)});if(!res.ok)throw new Error('Schema HTTP '+res.status);const raw=await res.text();originalSha256=hash(raw);api=JSON.parse(raw);}else{const raw=fs.readFileSync(snapshot,'utf8');if(hash(raw)!==previous.sources[group].sanitizedSha256)throw new Error('Snapshot hash mismatch');api=JSON.parse(raw);}
 if(api.openapi!=='3.0.1'||api.info?.version!=='v1'||!api.paths||!api.components)throw new Error('Upstream version changed; review before accepting');
 api=strip(api);
 const defs=clean(api.components.schemas??{});
 for(const [path,item]of Object.entries(api.paths))for(const [method,op]of Object.entries(item)){
  if(!['get','post','put','patch','delete'].includes(method))continue;
  const name=aliases[op.operationId];if(!name)throw new Error('Unreviewed operation '+op.operationId);
  let bodySchema=clean(op.requestBody?.content?.['application/json']?.schema??{type:'object',properties:{}});if(bodySchema.$ref){const {$ref,...rest}=bodySchema;bodySchema={...defs[$ref.split('/').at(-1)],...rest};}
  bodySchema.$defs=reachable(bodySchema,defs);
  const params=[...(item.parameters??[]),...(op.parameters??[])].filter(p=>['path','query','header'].includes(p.in)).map(p=>{if(p.$ref||p.in==='header'&&p.name!=='Idempotency-Key')throw new Error('Unreviewed parameter');const schema=clean(p.schema??{});schema.description=p.description??'';if(p.in==='path'&&schema.type==='string')schema.minLength=1;return {...p,key:p.in==='header'?'idempotency_key':p.name,schema};});
  for(const [,n]of path.matchAll(/\{([^}]+)\}/g))if(!params.some(p=>p.in==='path'&&p.name===n))params.push({name:n,key:n,in:'path',required:true,schema:{type:'string',minLength:1,description:n==='url'?'Public HTTPS URL of the selected media file.':'Exact resource ID from the selected account.',...(n==='url'?{format:'uri',pattern:'^https://'}:{})}});
  const risk=method==='get'?'read':'destructive';
  operations.push({name,title:op.summary??name,description:(op.description??'').trim()+'\n'+(risk==='read'?'Read operation.':'Explicit confirmation is required for this exact action; provider charges, hosting, sharing or deletion may apply. Never automatically resubmit unknown outcomes.'),method:method.toUpperCase(),path,group,risk,params,bodySchema,bodyRequired:!!(op.requestBody?.required||bodySchema.required?.length),paginated:false,origin:group,contentType:'application/json'});
 }
 const raw=JSON.stringify(strip(api),null,2)+'\n';fs.writeFileSync(snapshot,raw);sources[group]={source,originalSha256,sanitizedSha256:hash(raw)};
}
if(operations.length!==22||new Set(operations.map(o=>o.name)).size!==22)throw new Error('Reviewed operation inventory changed');
fs.writeFileSync(new URL('../src/tools/operations.json',import.meta.url),JSON.stringify(operations,null,2)+'\n');
fs.writeFileSync(proofURL,JSON.stringify({...previous,operationCount:operations.length,sources},null,2)+'\n');
console.log(JSON.stringify({apiOperations:22,tools:23,reads:12,confirmedOperations:11,refreshed:refresh,sources}));
