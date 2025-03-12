const loadCategories=async()=>{
   const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
   const data = await res.json()
   const button = data.categories;
 loadCategoriesUI(button)
}

const loadCategoriesUI=(buttons)=>{
  // console.log(buttons)
    const buttonContainer = document.getElementById('button-container');
    for (const button of buttons) {
     const buttonDive = document.createElement('div');
     buttonDive.innerHTML=`
     <button onclick='handleClick(${button.category_id})' class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${button.category}</button>
     `;
     buttonContainer.append(buttonDive)
    };
    
}

const loadVideos = async ()=>{
   const res =await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
   const data = await res.json();
   const videos = data.videos;
   showVideoUi(videos)
}

const showVideoUi= (videos) =>{
  const videoContainer =document.getElementById('video-container');
  videoContainer.textContent = '';
   videos.forEach(video => {
   const videoCard = document.createElement('div');
   
   videoCard.innerHTML=`
   <div class="card bg-base-100 ">
                    <figure class="relative">
                        <img  class="w-auto h-[220px]" src="${video.thumbnail}" />
                        <span  class="absolute bottom-2 right-2 bg-black text-white p-2 rounded">3hrs 56 min ago</span>
                    </figure>
                    <div class="flex  gap-5 mt-7 ">
                        <div><div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-6 h-6 rounded-full ring ring-offset-2">
                              <img class="" src="${video.authors[0].profile_picture}" />
                            </div>
                          </div></div>
                        <div>
                            <h2 class="text-xl font-semibold">${video.title}</h2>
                            <div class="flex gap-2">
                                <h4 class="font-normal text-sm">${video.authors[0].profile_name}</h4>
                            <img class="w-5 h-5" src="https://img.freepik.com/free-vector/blue-star-check-mark_78370-4478.jpg?ga=GA1.1.1653412531.1714570615&semt=ais_hybrid" alt="">
                            </div>
                            <h4 class="font-normal text-sm"><span>${video.others.views}</span> views</h4>
                        </div>
                    </div>
                </div>
   `;
   videoContainer.appendChild(videoCard)
   });
}
const handleClick = async (id)=>{
  console.log(id)

  const noData = document.getElementById('no-data');
  noData.classList.add('hidden')
  const res =await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
  const data = await res.json();
  const videos = data.category
  showVideoUi(videos)
}
loadCategories()


// {
//   "category_id": "1001",
//   "video_id": "aaaa",
//   "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//   "title": "Shape of You",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//           "profile_name": "Olivia Mitchell",
//           "verified": ""
//       }
//   ],
//   "others": {
//       "views": "100K",
//       "posted_date": "16278"
//   },
//   "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }