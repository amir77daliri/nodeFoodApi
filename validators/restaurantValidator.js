const Yup = require('yup');


const schema = Yup.object().shape({
    name: Yup.string()
        .required("نام رستوران الزامی است")
        .min(4, "حداقل کاراکتر مجاز برای نام رستوران 4 کاراکتر است.")
        .max(200, ".حداکثر کاراکتر نام رستوران 200 کاراکتر است"),
    description: Yup.string()
        .required("محتوا الزامی است"),
    address: Yup.string("آدرس باید رشته باشد"),
    adminUsername: Yup.string().required("نام ادمین رستوران الزامی است."),    
    adminPassword: Yup.string().min(4).max(100).required("پسورد ادمین رستوران الزامی است."),    
    // photo: Yup.object().shape({
    //     name: Yup.string().required('لطفا یک تصویر برای مقاله انتخاب کنید'),
    //     size: Yup.number().max(3000000, "حجم تصویر نباید بیشتر از 3 مگابایت باشد"),
    //     mimeType: Yup.mixed().oneOf(["image/jpeg", "image/png"], "پسوند تصویر باید png یا jpg باشد")
    // })
});


module.exports = schema;