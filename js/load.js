const loadCategories = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  const data = await res.json()
  const button = data.categories;
 
  loadCategoriesUI(button)
}

const loadCategoriesUI = (buttons) => {
  // console.log(buttons)
  const buttonContainer = document.getElementById('button-container');
  for (const button of buttons) {
    const buttonDive = document.createElement('div');
    buttonDive.innerHTML = `
     <button id="btn-${button.category_id}" onclick='handleClick(${button.category_id})' class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${button.category}</button>
     `;
    buttonContainer.append(buttonDive)
  };

}

const loadVideos = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
  const data = await res.json();
  const videos = data.videos;
  showVideoUi(videos)
}

const showVideoUi = (videos) => {
  const videoContainer = document.getElementById('video-container');
  videoContainer.textContent = '';
  const noData = document.getElementById('no-data');
  if (videos.length === 0) {
    noData.classList.remove('hidden'); 
  } else {
    noData.classList.add('hidden');
  }

  videos.forEach(video => {
    const videoCard = document.createElement('div');

    videoCard.innerHTML = `
   <div class="card bg-base-100 ">
                    <figure class="relative">
                        <img  class="w-auto  md:h-[240px]" src="${video.thumbnail}" />
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
                    <button onclick="showLoadVideos('${video.video_id}')" class="btn btn-block">show Details</button>
                </div>
   `;
   
    videoContainer.appendChild(videoCard)
    
  });
 
}

const showLoadVideos =async (videoId)=>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
  const video = await res.json();
  const data = video.video;
  openModal(data)
}
const openModal = (data)=>{
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = '';


  modalContent = document.createElement('div');
  modalContent.innerHTML=`
  <p>${data.title}<p/>
  <p>hello<p/>

  <!-- Close Button -->
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  ` ;
  
  modalContainer.appendChild(modalContent);

  

  
  document.getElementById('my_modal_5').showModal();
}
const handleClick = async (id) => {
  loadingSpinner(true)
  // noData.classList.add('hidden')
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
  const data = await res.json();
  const videos = data.category
  loadingSpinner(false)
  showVideoUi(videos)
  
}
loadCategories()

const loadingSpinner=(isLoading)=>{
const loadingSpinner = document.getElementById('loading-spinner');
if(isLoading){
  loadingSpinner.classList.remove('hidden')
}
else{
  loadingSpinner.classList.add('hidden')
}
}