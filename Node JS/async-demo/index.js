console.log("Before");
getUser(1, (user) => {
  console.log(user);
});
console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("reading data..");
    callback({ id: id, username: "Harshit" });
  }, 2000);
}
