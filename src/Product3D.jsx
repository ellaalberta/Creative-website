import {useEffect, useRef, useState} from 'react';
const base = `${import.meta.env.BASE_URL}product-3d/`;
export default function Product3D(){
 const host=useRef(null), api=useRef(null);
 const [status,setStatus]=useState('loading'),[staticMode,setStaticMode]=useState(false);
 useEffect(()=>{
  if(staticMode){setStatus('static');return;}
  let stopped=false,cleanup=()=>{};
  setStatus('loading');
  async function start(){
   try{
    const probe=document.createElement('canvas');
    const gl=probe.getContext('webgl2');
    if(!gl)throw Error('WebGL unavailable');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    const [T,{OrbitControls},{GLTFLoader},response]=await Promise.all([import('three'),import('three/addons/controls/OrbitControls.js'),import('three/addons/loaders/GLTFLoader.js'),fetch(base+'model-manifest.json')]);
    if(!response.ok)throw Error('Model information unavailable');
    const manifest=await response.json();if(stopped)return;
    const container=host.current,scene=new T.Scene();scene.background=new T.Color(manifest.background);
    const renderer=new T.WebGLRenderer({antialias:true,alpha:false});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.toneMapping=T.ACESFilmicToneMapping;
    renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('role','img');renderer.domElement.setAttribute('aria-label','Interactive Table Time camera and phone concept. Drag to rotate. Arrow keys rotate; plus and minus zoom.');container.appendChild(renderer.domElement);
    const camera=new T.PerspectiveCamera(36,1,.001,20),controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.enablePan=false;controls.maxPolarAngle=Math.PI*.88;controls.minPolarAngle=.15;controls.rotateSpeed=.65;
    scene.add(new T.HemisphereLight(0xffffff,0x819485,2.7));
    const light=new T.DirectionalLight(0xfff5e4,3.3);light.position.set(.4,.7,.5);light.castShadow=true;light.shadow.mapSize.set(1024,1024);Object.assign(light.shadow.camera,{left:-.5,right:.5,top:.5,bottom:-.5,near:.01,far:3});light.shadow.bias=-.00015;scene.add(light);
    const rim=new T.DirectionalLight(0xd5e5ff,2);rim.position.set(-.4,.3,-.3);scene.add(rim);
    let frame=0,visible=true,loaded=false,model,bounds,center,size,view='Front',zoom=1;
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    const render=()=>{if(stopped)return;if(visible&&!document.hidden){controls.enableDamping=!motion.matches;controls.update();renderer.render(scene,camera)}frame=requestAnimationFrame(render)};
    function fit(preset=view){if(!loaded)return;view=preset;const aspect=container.clientWidth/Math.max(container.clientHeight,1);camera.aspect=aspect;camera.updateProjectionMatrix();const maxHalf=Math.max(size.y/2,size.x/2/aspect);const distance=maxHalf/Math.tan(T.MathUtils.degToRad(camera.fov/2))*1.34+size.z/2;const direction=preset==='Side'?new T.Vector3(1,.12,.28):preset==='Angle'?new T.Vector3(.65,.32,1):new T.Vector3(...manifest.camera.position).sub(new T.Vector3(...manifest.camera.target)).normalize();direction.normalize();controls.target.copy(center);camera.position.copy(center).addScaledVector(direction,distance*zoom);controls.minDistance=Math.max(size.length()*.65,.1);controls.maxDistance=size.length()*5;controls.update()}
    const resize=()=>{renderer.setSize(container.clientWidth,container.clientHeight);if(loaded)fit()};const observer=new ResizeObserver(resize);observer.observe(container);
    const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting});intersection.observe(container);
    const lost=e=>{e.preventDefault();setStatus('error')};renderer.domElement.addEventListener('webglcontextlost',lost);
    const rotate=amount=>{const offset=camera.position.clone().sub(controls.target);offset.applyAxisAngle(new T.Vector3(0,1,0),amount);camera.position.copy(controls.target).add(offset);controls.update()};
    api.current={view:name=>{zoom=1;fit(name)},zoom:factor=>{zoom=T.MathUtils.clamp(zoom*factor,.75,1.8);fit()},rotate};
    const keyboard=e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-'].includes(e.key)){e.preventDefault();if(e.key==='ArrowLeft')rotate(-.15);else if(e.key==='ArrowRight')rotate(.15);else api.current.zoom(['ArrowUp','+','='].includes(e.key)?.9:1.1)}};renderer.domElement.addEventListener('keydown',keyboard);
    cleanup=()=>{cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();controls.dispose();renderer.domElement.removeEventListener('webglcontextlost',lost);renderer.domElement.removeEventListener('keydown',keyboard);scene.traverse(o=>{if(o.isMesh){o.geometry?.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material]){for(const v of Object.values(m))if(v?.isTexture)v.dispose();m.dispose()}}});renderer.dispose();renderer.domElement.remove();api.current=null};
    resize();render();
    const gltf=await new GLTFLoader().loadAsync(base+'model.glb');if(stopped)return;
    model=gltf.scene;model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});scene.add(model);bounds=new T.Box3().setFromObject(model);center=bounds.getCenter(new T.Vector3());size=bounds.getSize(new T.Vector3());
    const floor=new T.Mesh(new T.PlaneGeometry(3,3),new T.ShadowMaterial({opacity:.13}));floor.rotation.x=-Math.PI/2;floor.position.y=bounds.min.y-.001;floor.receiveShadow=true;scene.add(floor);loaded=true;fit();renderer.render(scene,camera);setStatus('ready');
   }catch{if(!stopped){cleanup();setStatus('error')}}
  }
  start();return()=>{stopped=true;cleanup()};
 },[staticMode]);
 const ready=status==='ready'&&!staticMode;
 return <figure className="product-stage" aria-label="Table Time product concept">
  <div className="product-stage-label"><span className="status-dot"/> THE CAMERA + APP CONCEPT</div>
  <div ref={host} className={`product-canvas ${ready?'is-ready':''}`} aria-hidden={!ready}/>
  {!ready&&<img className="product-fallback" src={base+'preview.png'} alt="Confirmed Table Time concept: a mounted cream and navy camera beside a phone showing illustrative dining availability."/>}
  <div className="product-control-bar" aria-label="Product view controls">{ready?<><button onClick={()=>api.current?.view('Front')}>Front</button><button onClick={()=>api.current?.view('Side')}>Side</button><button onClick={()=>api.current?.view('Angle')}>Angle</button><button aria-label="Zoom in" onClick={()=>api.current?.zoom(.9)}>+</button><button aria-label="Zoom out" onClick={()=>api.current?.zoom(1.1)}>−</button><button onClick={()=>api.current?.view('Front')}>Reset</button></>:null}<button onClick={()=>setStaticMode(x=>!x)}>{staticMode?'Try interactive 3D':'Static preview'}</button></div>
  <figcaption role="status">{ready?'Drag to rotate · pinch to zoom · keyboard arrows supported':status==='loading'?'Loading interactive model · static preview shown':status==='error'?'Interactive 3D is unavailable on this device. Static preview shown.':'Static preview · interaction is turned off'}</figcaption>
  <p className="product-concept-note">A proposed camera-and-app experience. Screen values are illustrative.</p>
 </figure>;
}
