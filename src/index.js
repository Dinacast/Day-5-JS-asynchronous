// async callback

// const button = document.getElementById("button");

// button.addEventListener("clik", () => {
//   console.log("dijalankan saat button di klik");
// });

// console.log("langsung sini aja");

// setTimeout(() => {
//   console.log("dijalankan setelah tiga detik");
// }, 3000);

// console.log("langsung saja");

//function untuk get json data dari api

function get(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "json";
  xhr.onload = function () {
    callback(xhr.response);
  };

  xhr.send();
}

//callback hell
get("https://jsonplaceholder.typicode.com/users/1", (user) => {
  console.log("user", user);
  get(
    "https://jsonplaceholder.typicode.com/posts?userld=" + user.id,
    (posts) => {
      console.log("posts", posts);

      get(
        "https://jsonplaceholder.typicode.com/comments?postld=" + posts[0].id,
        (comments) => {
          console.log("comments", comments);
        }
      );
    }
  );
});

// console.log("hello di sini langsung saja");

// better version dari get dengan Promise

function betterGet(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "json";
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(xhr.response);
    };
    xhr.send();
  });
}

//promise way

betterGet("https://jsonplaceholder.typicode.com/users/1")
  .then((user) => {
    console.log("user promise", user);

    return betterGet(
      "https://jsonplaceholder.typicode.com/posts?userld=" + user.id
    );
  })
  .then((posts) => {
    console.log("posts promise", posts);
    return betterGet(
      "https://jsonplaceholder.typicode.com/comments?postld=" + posts[0].id
    );
  })
  .then((comments) => {
    console.log("comments promise", comments);
  })
  .catch((response) => {
    console.log(response);
  });

//async await

(async () => {
  const user = await betterGet("https://jsonplaceholder.typicode.com/users/1");
  console.log("await user", user);

  const posts = await betterGet(
    "https://jsonplaceholder.typicode.com/posts?userld="
  );
  console.log("await post", posts);

  const comments = await betterGet(
    "https://jsonplaceholder.typicode.com/comments?postld=" + posts[0].id
  );
  console.log(comments);
})();
