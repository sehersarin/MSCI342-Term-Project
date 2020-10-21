const router = express.Router();

 const accountCreationHandler = require('../models/handlers/accountCreation');

 router.get('/api/create-user', async(req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const type = req.query.type;
    const studentID = req.query.studentID;
    const email = req.query.email;
    const password = req.query.password;
    const phone = req.query.phone;

     const user = await accountCreationHandler.userAccount(firstName, lastName, type, studentID, email, password, phone);

     res.send(user);
 });

 module.exports = router  