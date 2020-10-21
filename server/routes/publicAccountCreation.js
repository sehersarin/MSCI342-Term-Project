const router = express.Router();

 const accountCreationHandler = require('../models/handlers/accountCreation');

 router.get('/api/create-user', async(req, res) => {
    //enter user feilds

     const user = await accountCreationHandler.userAccount(firstName, lastName, type, studentID, email, password, phone);

     res.send(user);
 });

 module.exports = router  