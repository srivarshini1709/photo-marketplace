/* =========================
   NAVBAR AUTH
========================= */

const navLinks =
document.getElementById("navLinks");

const token =
localStorage.getItem("token");


if (navLinks) {

  if (token) {

    navLinks.innerHTML = `
    
      <a href="upload.html">
        Upload
      </a>

      <a href="dashboard.html">
        Dashboard
      </a>

      <a href="profile.html">
  Profile
</a>

      <a href="#" id="logoutBtn">
        Logout
      </a>
    
    `;

  } else {

    navLinks.innerHTML = `
    
      <a href="login.html">
        Login
      </a>

      <a href="register.html">
        Register
      </a>
    
    `;
  }
}



/* =========================
   LOGOUT
========================= */

document.addEventListener(
  "click",
  (e) => {

    if (e.target.id === "logoutBtn") {

      localStorage.removeItem("token");

      alert("Logged Out");

      window.location.href =
      "login.html";
    }
  }
);




/* =========================
   FETCH ALL PHOTOS
========================= */

const gallery =
document.getElementById("gallery");


async function fetchPhotos() {

  if (!gallery) return;

  try {

    const response = await fetch(
      "https://photo-marketplace.onrender.com/api/photos"
    );

    const photos = await response.json();

    gallery.innerHTML = "";

    photos.forEach((photo) => {

      gallery.innerHTML += `
      
        <div class="photo-card">

          <img src="${photo.imageUrl}" />

          <div class="photo-content">

            <h3>${photo.title}</h3>

            <p>${photo.description}</p>

            <div class="photo-actions">

              <button
                onclick="likePhoto('${photo._id}')"
              >
                ❤️ ${photo.likes}
              </button>

             <button
             onclick="downloadPhoto('${photo.imageUrl}')"
             >
             Download
             </button>

            </div>

          </div>

        </div>

      `;
    });

  } catch (error) {
    console.log(error);
  }
}
fetchPhotos();



/* SEARCH */

const searchInput =
document.getElementById("searchInput");


if (searchInput) {

  searchInput.addEventListener(
    "input",
    async (e) => {

      const value =
      e.target.value.toLowerCase();

      const response = await fetch(
        "https://photo-marketplace.onrender.com/api/photos"
      );

      const photos =
      await response.json();

      const filteredPhotos =
      photos.filter((photo) =>
        photo.title
          .toLowerCase()
          .includes(value)
      );

      gallery.innerHTML = "";

      filteredPhotos.forEach((photo) => {

        gallery.innerHTML += `
        
          <div class="photo-card">

            <img src="${photo.imageUrl}" />

            <div class="photo-content">

              <h3>${photo.title}</h3>

              <p>${photo.description}</p>

              <p>
                Price: ₹${photo.price}
              </p>

              <div class="photo-actions">

                <button
                  onclick="likePhoto('${photo._id}')"
                >
                  ❤️ ${photo.likes}
                </button>

                <a href="${photo.imageUrl}"
                   download
                   target="_blank">

                  <button>
                    Download
                  </button>

                </a>

              </div>

            </div>

          </div>

        `;
      });
    }
  );
}
/* =========================
   REGISTER
========================= */

const registerForm =
document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const name =
      document.getElementById("name").value;

      const email =
      document.getElementById("email").value;

      const password =
      document.getElementById("password").value;


      try {

        const response = await fetch(
          "https://photo-marketplace.onrender.com/api/auth/register",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              name,
              email,
              password,
            }),
          }
        );

        const data = await response.json();

        alert("Registration Successful");

        localStorage.setItem(
          "token",
          data.token
        );
        localStorage.setItem(
  "userName",
  data.name
);

localStorage.setItem(
  "userEmail",
  data.email
);

        window.location.href =
        "index.html";

      } catch (error) {
        console.log(error);
      }
    }
  );
}




/* =========================
   LOGIN
========================= */

const loginForm =
document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const email =
      document.getElementById("loginEmail").value;

      const password =
      document.getElementById("loginPassword").value;


      try {

        const response = await fetch(
          "https://photo-marketplace.onrender.com/api/auth/login",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const data = await response.json();

        alert("Login Successful");

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
  "userName",
  data.name
);

localStorage.setItem(
  "userEmail",
  data.email
);

        window.location.href =
        "index.html";

      } catch (error) {
        console.log(error);
      }
    }
  );
}
/* IMAGE PREVIEW */

const imageInput =
document.getElementById("image");

const previewImage =
document.getElementById(
  "previewImage"
);


if (imageInput) {

  imageInput.addEventListener(
    "change",
    () => {

      const file =
      imageInput.files[0];

      if (file) {

        previewImage.src =
        URL.createObjectURL(file);

        previewImage.style.display =
        "block";
      }
    }
  );
}
/* =========================
   IMAGE UPLOAD
========================= */

const uploadForm =
document.getElementById("uploadForm");

if (uploadForm) {

  uploadForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const title =
      document.getElementById("title").value;

      const description =
      document.getElementById("description").value;

      const imageFile =
      document.getElementById("image").files[0];


      // Convert image to Base64
      const reader = new FileReader();

      reader.readAsDataURL(imageFile);

      reader.onloadend = async () => {

        const imageBase64 =
        reader.result;

        const token =
        localStorage.getItem("token");

        try {

          const response = await fetch(
            "https://photo-marketplace.onrender.com/api/photos",
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",

                Authorization:
                `Bearer ${token}`,
              },

              body: JSON.stringify({
                title,
                description,
                imageBase64,
              }),
            }
          );

          const data =
          await response.json();

          console.log(data);

          alert(
            "Photo Uploaded Successfully"
          );

          window.location.href =
          "index.html";

        } catch (error) {
          console.log(error);
        }
      };
    }
  );
}




/* =========================
   LIKE PHOTO
========================= */

async function likePhoto(id) {

  const token =
  localStorage.getItem("token");

  if (!token) {

    alert(
      "Please login to like photos"
    );

    window.location.href =
    "login.html";

    return;
  }

  try {

    await fetch(
      `https://photo-marketplace.onrender.com/api/photos/like/${id}`,
      {
        method: "PUT",
      }
    );

    fetchPhotos();

  } catch (error) {
    console.log(error);
  }
}


/* =========================
   DASHBOARD
========================= */

const dashboardGallery =
document.getElementById(
  "dashboardGallery"
);


async function fetchMyPhotos() {

  if (!dashboardGallery) return;

  const token =
  localStorage.getItem("token");

  try {

    const response = await fetch(
      "https://photo-marketplace.onrender.com/api/photos/my/photos",
      {
        headers: {
          Authorization:
          `Bearer ${token}`,
        },
      }
    );

    const photos =
    await response.json();

    dashboardGallery.innerHTML = "";

    photos.forEach((photo) => {

      dashboardGallery.innerHTML += `
      
        <div class="photo-card">

          <img src="${photo.imageUrl}" />

          <div class="photo-content">

            <h3>${photo.title}</h3>

            <p>${photo.description}</p>

            <button
              onclick="deletePhoto('${photo._id}')"
            >
              Delete
            </button>

          </div>

        </div>

      `;
    });

  } catch (error) {
    console.log(error);
  }
}

fetchMyPhotos();




/* =========================
   DELETE PHOTO
========================= */

async function deletePhoto(id) {

  const token =
  localStorage.getItem("token");

  try {

    await fetch(
      `https://photo-marketplace.onrender.com/api/photos/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
          `Bearer ${token}`,
        },
      }
    );

    alert("Photo Deleted");

    fetchMyPhotos();

  } catch (error) {
    console.log(error);
  }
}
/* DOWNLOAD PHOTO */

function downloadPhoto(imageUrl) {

  const token =
  localStorage.getItem("token");

  if (!token) {

    alert(
      "Please login to download photos"
    );

    window.location.href =
    "login.html";

    return;
  }

  window.open(imageUrl, "_blank");
}
/* =========================
   PROFILE PAGE
========================= */

const profileName =
document.getElementById(
  "profileName"
);

const profileEmail =
document.getElementById(
  "profileEmail"
);

const totalUploads =
document.getElementById(
  "totalUploads"
);

const profileGallery =
document.getElementById(
  "profileGallery"
);


async function loadProfile() {

  if (!profileGallery) return;

  const token =
  localStorage.getItem("token");

  try {

    // Get user photos
    const response = await fetch(
      "https://photo-marketplace.onrender.com/api/photos/my/photos",
      {
        headers: {
          Authorization:
          `Bearer ${token}`,
        },
      }
    );

    const photos =
    await response.json();

    // Get user info from token storage
    const userName =
    localStorage.getItem("userName");

    const userEmail =
    localStorage.getItem("userEmail");

    profileName.textContent =
    userName || "User";

    profileEmail.textContent =
    userEmail || "Email";

    totalUploads.textContent =
    `Total Uploads: ${photos.length}`;

    profileGallery.innerHTML = "";

    photos.forEach((photo) => {

      profileGallery.innerHTML += `
      
        <div class="photo-card">

          <img src="${photo.imageUrl}" />

          <div class="photo-content">

            <h3>${photo.title}</h3>

            <p>${photo.description}</p>

          </div>

        </div>

      `;
    });

  } catch (error) {
    console.log(error);
  }
}

loadProfile();