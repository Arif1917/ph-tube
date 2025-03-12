const loadCategories=async()=>{
   const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
   const data = await res.json()
   const button = data.categories;
 loadCategoriesUI(button)
}

const loadCategoriesUI=(buttons)=>{
  console.log(buttons)
    const buttonContainer = document.getElementById('button-container');
    for (const button of buttons) {
     const buttonDive = document.createElement('div');
     buttonDive.innerHTML=`
     <button onclick='handleClick()' class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${button.category}</button>
     `;
     buttonContainer.append(buttonDive)
    };
    
}

const handleClick = ()=>{
  console.log('click')
}
loadCategories()