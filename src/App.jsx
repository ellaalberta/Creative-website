import { useState } from 'react';

function Paw({ className = '' }) {
  return <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true"><ellipse cx="11" cy="12" rx="5" ry="7" transform="rotate(-25 11 12)"/><ellipse cx="25" cy="9" rx="5" ry="7" transform="rotate(15 25 9)"/><ellipse cx="34" cy="20" rx="4" ry="6" transform="rotate(30 34 20)"/><ellipse cx="5" cy="25" rx="4" ry="6" transform="rotate(-25 5 25)"/><path d="M11 29c0-7 5-12 10-12s12 8 12 14-7 5-11 4-11 2-11-6Z"/></svg>;
}
const benefits = [
  ['01', 'A little more happy', 'Make everyday school belongings more fun and colorful.'],
  ['02', 'Totally, wonderfully you', 'Show off your love of dogs, sweet treats, and being yourself.'],
  ['03', 'Small gift. Big smiles.', 'A playful little surprise for a birthday, reward, or just because.'],
];
export default function App() {
  const [selected, setSelected] = useState('Backpack');
  return <>
    <div className="announcement">A LITTLE PUP. A LOT OF PERSONALITY. <span aria-hidden="true">✦</span> MADE FOR BIG IMAGINATIONS.</div>
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Cupcake Pup home"><Paw/><span>cupcake<span className="brand-pup">pup</span></span></a>
      <nav aria-label="Main navigation"><a href="#meet">Meet your pup</a><a href="#parents">For the grown-ups</a></nav>
      <a className="nav-shop" href="#shop">Pick your pup <span aria-hidden="true">↗</span></a>
    </header>
    <main id="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="mini-star" aria-hidden="true">✦</span> LITTLE PATCH. BIG PERSONALITY.</p>
          <h1 id="hero-title">Make your<br/>backpack as<br/><span className="pink-word">fun as you</span> are<span className="blue-dot">!</span></h1>
          <p className="hero-description">Meet <strong>Cupcake Pup Patch</strong>—a sweet little sidekick for kids ages 6–10. Part puppy, part cupcake, all you.</p>
          <a className="button" href="#shop">Pick Your Pup—Shop Now! <span aria-hidden="true">↗</span></a>
          <div className="hero-note"><Paw/> For backpacks, jackets & little everyday adventures</div>
        </div>
        <figure className="hero-visual">
          <div className="sticker">100%<br/><span>your kind<br/>of cute</span></div>
          <img src={`${import.meta.env.BASE_URL}cupcake-pup-scene.png`} alt="Illustrative mockup of a floppy-eared cupcake puppy patch with colorful sprinkles and a blue wrapper, beside matching patches on a pink school backpack and denim jacket" fetchPriority="high" width="1024" height="1024"/>
          <div className="image-label"><span aria-hidden="true">✦</span> YOUR NEW SCHOOL BUDDY</div>
          <figcaption>Illustrative product mockup</figcaption>
        </figure>
        <span className="sprinkle s1" aria-hidden="true"/><span className="sprinkle s2" aria-hidden="true"/>
      </section>
      <div className="ticker" aria-hidden="true"><span>DOG LOVERS</span> ✦ <span>SWEET TREAT FANS</span> ✦ <span>ONE-OF-A-KIND KIDS</span> ✦ <span>BIG LITTLE PERSONALITIES</span> ✦</div>
      <section className="meet section-wrap" id="meet">
        <div className="section-intro"><p className="eyebrow">SWEET. SILLY. SO YOU.</p><h2>Meet your new<br/><span>school buddy.</span></h2></div>
        <div className="meet-copy"><p>Meet Cupcake Pup—your sweet new school buddy! With floppy ears, colorful sprinkles, and a bright blue cupcake wrapper, this playful patch adds personality to your backpack or jacket.</p><p className="handwritten">Pick a spot and let your style shine! <span aria-hidden="true">✧</span></p></div>
        <div className="benefits">{benefits.map(([n,title,copy])=><article key={n}><span className="benefit-number">{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>
      <section className="shop section-wrap" id="shop" aria-labelledby="shop-title"><div><p className="eyebrow">WHERE WILL YOUR PUP GO?</p><h2 id="shop-title">One little patch.<br/>Your kind of happy.</h2><p>A personal touch for your backpack or outfit.<br/>Choose a spot to picture your new sidekick.</p></div><div className="picker"><p className="picker-label">I’m putting mine on my…</p><div className="choices" role="group" aria-label="Choose where to put your patch">{['Backpack','Denim jacket'].map(place=><button key={place} aria-pressed={selected===place} onClick={()=>setSelected(place)}>{place} <span aria-hidden="true">{selected===place?'✓':'+'}</span></button>)}</div><p className="selection" aria-live="polite">{selected === 'Backpack' ? 'A little school-day sidekick. That’s so you!' : 'Your favorite jacket, with a little extra personality.'}</p><details className="product-reference"><summary>See the original product photo</summary><img src={`${import.meta.env.BASE_URL}cupcake-pup-reference.png`} alt="Original supplied Google merchandise photo of the dog-and-cupcake embroidered patch" loading="lazy" width="834" height="960"/></details><div className="shop-status"><strong>Your pup pick: Cupcake Pup Patch</strong><p>Online purchasing isn’t available on this page yet. A grown-up can check back for the shop link and product details.</p></div></div></section>
      <section className="parents section-wrap" id="parents"><div className="parents-heading"><p className="eyebrow">A LITTLE HELP FROM A GROWN-UP</p><h2>Pick a spot.<br/>Make it yours.</h2><p>Before attaching, check the patch’s packaging for its backing type and care instructions. Attachment details for this product are still to be confirmed.</p></div><div className="steps"><article><span>1</span><div><h3>Choose your happy place</h3><p>With your child, pick a flat spot on their backpack or denim jacket. Check the fabric’s care label first.</p></div></article><article><span>2</span><div><h3>Check before you attach</h3><p>Follow the patch maker’s instructions for the supplied backing. Don’t assume this patch is iron-on or adhesive.</p></div></article><article><span>3</span><div><h3>Grown-ups do the attaching</h3><p>Leave any heat or needles to an adult. Check that the patch is secure before wearing, and follow the product’s washing instructions.</p></div></article></div></section>
      <section className="closing"><Paw/><h2>A sprinkle of fun.<br/>A whole lot of you.</h2><a className="button" href="#shop">Pick Your Pup—Shop Now! <span aria-hidden="true">↗</span></a></section>
    </main><footer><a href="#home" className="footer-brand">cupcake pup</a><p>Little details. Big personality.</p><a href="#parents">Parent guide ↗</a></footer>
  </>;
}
