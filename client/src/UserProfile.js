var UserProfile = (function() {
    var pseudo = "";
    var email = "";
    var id = "";
    var token = "";
    var isAdmin = false;
    var isAuth = false;

    var getPseudo = function() {
        return pseudo
    };
    var setPseudo = function(p) {
        pseudo = p
    };

    var getEmail = function() {
        return email
    };
    var setEmail = function(e) {
        email = e
    };

    var getId = function() {
        return id
    };
    var setId = function(i) {
        id = i
    };

    var getToken = function() {
        return token
    };
    var setToken = function(t) {
        token = t
    };

    var getIsAdmin = function() {
        return isAdmin
    };
    var setIsAdmin = function(i) {
        isAdmin = i
    };

    var getIsAuth = function() {
        return isAuth
    };
    var setIsAuth = function(i) {
        isAuth = i
    };
  
    return {
        getPseudo: getPseudo,
        setPseudo: setPseudo,
        getEmail: getEmail,
        setEmail: setEmail,
        getId: getId,
        setId: setId,
        getToken: getToken,
        setToken: setToken,
        getIsAdmin: getIsAdmin,
        setIsAdmin: setIsAdmin,
        getIsAuth: getIsAuth,
        setIsAuth: setIsAuth
    }
  
})();
  
  export default UserProfile;