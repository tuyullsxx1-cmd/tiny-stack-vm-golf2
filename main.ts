const S='(9i,.237zzzzzzzz1111111-111-111z111zzzzzzzzzzzzzHLLH(zzzzzzzzzzz-0zzzzzzzzzzzzzz,,),';
import F from'node:fs';
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env;
function run(p,q){
let n=p.length,A=new Int32Array(576),o=Buffer.alloc(65536),s=0,c=0,l=0,i=0,x=0,t=0,e;
A:for(;;){
if(t==1e6){e=10;break A}
if(x<0|x>=n){e=9;break A}
const op=p[x],v=S.charCodeAt(op)-40,m=v>>4;
if(op>83|m>4){e=5;break A}
const y=v>>2&3,w=v&3,nx=x+1+m;
if(nx>n){e=9;break A}
t++;
if(s<y){e=2;break A}
if(s-y+w>256){e=3;break A}
x=nx;
switch(op){
case 0:e=0;break A;
case 1:A[s++]=p[nx-1]<<24>>24;break;
case 2:A[s++]=p.readInt32LE(nx-4);break;
case 3:s--;break;
case 4:case 6:A[s]=A[s-op/2+1];s++;break;
case 5:e=A[s-1];A[s-1]=A[s-2];A[s-2]=e;break;
case 7:[A[s-3],A[s-2],A[s-1]]=[A[s-2],A[s-1],A[s-3]];break;
case 23:case 27:A[s-1]=-A[s-1]-(op>24);break;
case 48:case 49:case 50:if(op<49||(A[--s]===0)^(op>49))x=nx+p.readInt16LE(nx-2);break;
case 51:if(c>63){e=7;break A}A[512+c++]=nx;x=p[nx-2]|p[nx-1]<<8;break;
case 52:if(!c){e=8;break A}x=A[--c+512];break;
case 64:case 65:{e=A[s-1];if(e>>>0>255){e=6;break A}if(op&1)A[e+256]=A[s-=2];else A[s-1]=A[e+256];break;}
case 80:{e=Buffer.from(A[s-1]+'');if(l+e.length>65536){e=11;break A}s--;o.set(e,l);l+=e.length;break;}
case 81:if(l>>16){e=11;break A}o[l++]=A[--s];break;
case 82:A[s++]=q[i++]??-1;break;
case 83:e=A[--s]&255;break A;
default:{const b=A[s-1],a=A[s-2];
if(!b&op>18&op<23){e=4;break A}
A[s-2]=op<19?op<17?a+b:op<18?a-b:Math.imul(a,b):op<23?op<20?a/b:op<21?a%b:op<22?(a>>>0)/(b>>>0):(a>>>0)%(b>>>0):op<27?op<25?a&b:op<26?a|b:a^b:op<31?op<29?a<<b:op<30?a>>b:a>>>b:op<33?a===b:op<34?a<b:a>>>0<b>>>0;
s--;break;}
}}
return[o.slice(0,l),e]}
for(const d of F.readdirSync(I)){
const a=I+'/'+d,b=O+'/'+d,R=f=>F.readFileSync(a+'/'+f),W=F.writeFileSync,[u,v]=run(R('program.bin'),R('input.bin'));
F.mkdirSync(b,{recursive:!0});
W(b+'/stdout.bin',u);
W(b+'/exit.txt',v+'\n')}
