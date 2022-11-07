app.get("/user", (req, res) => {
  var name = req.query.name;
  var isAuthor = req.query.isAuthor;
  res.json({
    name,
    isAuthor,
  });
});

req.query = { name: "Theodore", isAuthor: true };

//https://educative.io/user?name=Theodore&isAuthor=true
