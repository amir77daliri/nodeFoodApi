const Yup = require('yup');

// for restaurant admin login :
const schema = Yup.object().shape({
    username: Yup.string().required("نام ادمین رستوران الزامی است."),    
    password: Yup.string().min(4, "طول رمز عبور باید بیشتر از 4 کاراکتر باشد.").max(100, "حداکثر کاراکتر مجاز برای پسورد 100 می باشد").required("پسورد ادمین رستوران الزامی است."),    

});


module.exports = schema;