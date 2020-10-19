export default (sequelize, Datatypes) => {
    const User = sequelize.define ('User',){
        username:{
            type: DataTypes.STRING,
            unique:true;
        },
        email: {
            type: DataTypes.STRING,
            unique:true;
        },
        password: DataTypesSTRING
        confirmed {
            type: DataTypes.BOOLEAN, 
            defaultValue: false,
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue:false,
        },  
    }
}