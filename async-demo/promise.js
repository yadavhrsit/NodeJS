const p = new Promise((resolve, reject) => {
  resolve(1);
  // reject(new Error("Promise Got Rejected"));
});
p.then((result) => console.log("Result: ", result));
// p.catch((result) => console.log(result));
