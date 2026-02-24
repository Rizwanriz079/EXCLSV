/* ═══════════════════════════════
   EXCLSV — Product Data
═══════════════════════════════ */
const PRODUCTS = [
  {
    id:1, name:"Classic Black Tee", cats:["tshirts","men"],
    price:49, oldPrice:null, badge:"new", trending:true,
    img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=80",
    imgs:[
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=80"
    ],
    desc:"The essential black tee. Crafted from 100% heavyweight 280gsm cotton with a relaxed fit designed for everyday wear. A cornerstone of every EXCLSV wardrobe.",
    details:"100% Heavyweight Cotton (280gsm). Relaxed oversized fit. Ribbed crewneck. Dropped shoulders. Pre-washed for softness.",
    care:"Machine wash cold with similar colours. Do not bleach. Tumble dry low. Cool iron if needed.",
    sizes:["XS","S","M","L","XL","XXL"], oos:[], colors:["#111","#333"]
  },
  {
    id:2, name:"Oversized Logo Tee", cats:["tshirts","unisex"],
    price:55, oldPrice:null, badge:"new", trending:true,
    img:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=700&q=80",
    imgs:[
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=900&q=80"
    ],
    desc:"Unisex oversized tee with embroidered EXCLSV logo. Dropped shoulders, boxy silhouette. Premium 280gsm cotton — fits men and women perfectly.",
    details:"100% Cotton (280gsm). Unisex boxy fit. Embroidered logo. Dropped shoulders. Side seam stitched.",
    care:"Machine wash cold. Do not tumble dry. Hang to dry for best results.",
    sizes:["XS","S","M","L","XL","XXL"], oos:["XS"], colors:["#000","#fff","#888"]
  },
  {
    id:3, name:"Essential White Tee", cats:["tshirts","men"],
    price:39, oldPrice:55, badge:"sale", trending:false,
    img:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=700&q=80",
    imgs:[
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80"
    ],
    desc:"Clean, crisp, and timeless. Our essential white tee in a relaxed fit with a subtle tone-on-tone EXCLSV chest logo. The perfect everyday essential.",
    details:"100% Combed Cotton (220gsm). Relaxed fit. Tonal embroidered logo. Double-stitched hems.",
    care:"Machine wash cold. Do not bleach. Line dry recommended.",
    sizes:["XS","S","M","L","XL"], oos:[], colors:["#fff","#f5f5f5"]
  },
  {
    id:4, name:"Graphic Print Tee", cats:["tshirts","unisex"],
    price:65, oldPrice:null, badge:null, trending:true,
    img:"https://images.unsplash.com/photo-1562157873-818bc0726f68?w=700&q=80",
    imgs:[
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=900&q=80"
    ],
    desc:"Bold graphic print on heavyweight cotton. Limited edition artwork printed with water-based inks for a soft, premium feel that only gets better with age.",
    details:"100% Cotton (300gsm). Boxy fit. Screen-printed with water-based inks. Limited run.",
    care:"Turn inside out before washing. Machine wash cold. Air dry only.",
    sizes:["S","M","L","XL"], oos:[], colors:["#000","#fff"]
  },
  {
    id:5, name:"Premium Black Hoodie", cats:["hoodies","men"],
    price:95, oldPrice:null, badge:"new", trending:true,
    img:"https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=700&q=80",
    imgs:[
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=900&q=80",
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80"
    ],
    desc:"Heavyweight French terry hoodie in our signature black. Dropped shoulders, kangaroo pocket, metal drawcord tips. Built to be worn forever.",
    details:"80% Cotton, 20% Polyester (420gsm French Terry). Relaxed fit. Metal eyelets. Kangaroo pocket. Ribbed cuffs and hem.",
    care:"Machine wash cold. Tumble dry low. Do not iron on print.",
    sizes:["XS","S","M","L","XL","XXL"], oos:[], colors:["#000"]
  },
  {
    id:6, name:"Zip Hoodie Unisex", cats:["hoodies","unisex"],
    price:89, oldPrice:null, badge:null, trending:false,
    img:"https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=700&q=80",
    imgs:[
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=900&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=80"
    ],
    desc:"Full-zip unisex hoodie with ribbed cuffs and hem. YKK zipper, fleece-lined interior. Versatile, warm, and built to last.",
    details:"85% Cotton, 15% Polyester fleece. Full-length YKK zip. Relaxed unisex fit. Two side pockets.",
    care:"Machine wash cold. Tumble dry low.",
    sizes:["XS","S","M","L","XL"], oos:["XS"], colors:["#000","#888"]
  },
  {
    id:7, name:"Slim Fit Joggers", cats:["bottoms","men"],
    price:75, oldPrice:null, badge:null, trending:false,
    img:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=700&q=80",
    imgs:[
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=900&q=80"
    ],
    desc:"Technical slim-fit joggers with a tapered leg. Elastic waistband with internal drawstring, two zip side pockets, back welt pocket.",
    details:"95% Cotton, 5% Elastane. Slim tapered fit. Elastic waistband with drawstring. Zip pockets.",
    care:"Machine wash cold. Tumble dry low. Do not iron waistband.",
    sizes:["XS","S","M","L","XL"], oos:[], colors:["#000","#111"]
  },
  {
    id:8, name:"Cargo Pants", cats:["bottoms","men"],
    price:85, oldPrice:110, badge:"sale", trending:false,
    img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=700&q=80",
    imgs:[
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80"
    ],
    desc:"Utility cargo pants with six pockets and reinforced knees. Relaxed straight fit, adjustable ankle cuffs. Built for the streets.",
    details:"100% Cotton ripstop fabric. Relaxed straight fit. 6 pockets. Reinforced knees. Adjustable ankle cuffs.",
    care:"Machine wash cold. Line dry. Iron on reverse.",
    sizes:["S","M","L","XL"], oos:["XL"], colors:["#000","#222"]
  },
  {
    id:9, name:"EXCLSV Signature Tee", cats:["tshirts","unisex"],
    price:79, oldPrice:null, badge:"new", trending:true,
    img:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=700&q=80",
    imgs:[
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=80"
    ],
    desc:"Our most iconic piece. The signature EXCLSV tee with chenille-embroidered wordmark. 320gsm heavyweight cotton, boxy fit — this is the one.",
    details:"100% Cotton (320gsm). Boxy unisex fit. Chenille embroidered logo. Drop shoulders. Double-stitched collar.",
    care:"Machine wash cold. Do not bleach. Air dry for longevity.",
    sizes:["XS","S","M","L","XL","XXL"], oos:[], colors:["#000","#fff","#111"]
  },
  {
    id:10, name:"Minimal Logo Cap", cats:["accessories","unisex"],
    price:45, oldPrice:null, badge:null, trending:false,
    img:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=700&q=80",
    imgs:[
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=80"
    ],
    desc:"6-panel structured cap with tonal embroidered EXCLSV logo. Adjustable leather strap, premium wool-cotton blend. One size fits all.",
    details:"60% Wool, 40% Cotton. 6-panel structured cap. Tonal embroidery. Adjustable leather strap. Sweatband included.",
    care:"Spot clean only. Do not machine wash. Store in a cool dry place.",
    sizes:["One Size"], oos:[], colors:["#000","#fff"]
  },
  {
    id:11, name:"Statement Tee", cats:["tshirts","men"],
    price:59, oldPrice:null, badge:null, trending:false,
    img:"https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=700&q=80",
    imgs:[
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=80"
    ],
    desc:"Bold statement typography on 100% organic cotton. Oversized fit with a raw-edge hem detail. Say it without saying it.",
    details:"100% GOTS Certified Organic Cotton (260gsm). Oversized fit. Raw-edge hem. Screen-printed graphics.",
    care:"Machine wash cold. Turn inside out. Air dry recommended.",
    sizes:["S","M","L","XL","XXL"], oos:[], colors:["#000"]
  },
  {
    id:12, name:"Relaxed Fit Tee", cats:["tshirts","unisex"],
    price:52, oldPrice:null, badge:null, trending:false,
    img:"https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=700&q=80",
    imgs:[
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80"
    ],
    desc:"Ultra-soft relaxed fit tee in brushed cotton. Slightly longer back hem, ribbed crewneck. The perfect everyday unisex essential.",
    details:"100% Brushed Cotton (240gsm). Relaxed unisex fit. Ribbed crewneck. Extended back hem.",
    care:"Machine wash cold. Tumble dry low. Warm iron.",
    sizes:["XS","S","M","L","XL"], oos:[], colors:["#000","#fff","#888","#222"]
  }
];

// Helpers
function getProduct(id)          { return PRODUCTS.find(p=>p.id===+id); }
function getTrending()           { return PRODUCTS.filter(p=>p.trending).slice(0,4); }
function getNewArrivals()        { return PRODUCTS.filter(p=>p.badge==='new').slice(0,4); }
function getBestSellers()        { return [PRODUCTS[2],PRODUCTS[3],PRODUCTS[6],PRODUCTS[11]]; }
function getRelated(id,n=4)      { const p=getProduct(id); if(!p)return[]; return PRODUCTS.filter(x=>x.id!==+id&&x.cats.some(c=>p.cats.includes(c))).slice(0,n); }
function filterProducts(cat)     { return cat==='all'?PRODUCTS:PRODUCTS.filter(p=>p.cats.includes(cat)); }
