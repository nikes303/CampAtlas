const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};
module.exports.register = async (req, res, next) => {
  console.log("!!!!!!!! IN THE REGISTER POST ROUTE !!!!!!!!");
  console.log(req.body);
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);

    // ADD THIS LOG to see if the user was created
    console.log("USER REGISTERED SUCCESSFULLY:", registeredUser);

    req.login(registeredUser, (err) => {
      // ADD THIS LOG to see if this callback is running
      console.log("INSIDE REQ.LOGIN CALLBACK");
      if (err) {
        // ADD THIS LOG to see if there's a login error
        console.log("ERROR IN REQ.LOGIN:", err);
        return next(err);
      }
      req.flash("success", "Welcome to CampAtlas!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    console.log("CAUGHT AN ERROR:", e);
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "welcome back!");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  // req.session.destroy();
  req.flash("success", "Goodbye!");
  res.redirect("/campgrounds");
};
