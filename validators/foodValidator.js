const Yup = require('yup');


const schema = Yup.object().shape({
    name: Yup.string()
        .required("نام غذا الزامی است")
        .min(3, "حداقل کاراکتر مجاز برای نام رستوران 3 کاراکتر است."),
    price: Yup.number("قیمت غذا باید به عدد وارد شود.").required('قیمت غذا را تعیین کنید'),
    description: Yup.string(),
    score: Yup.number(),
    photo: Yup.object().shape({
        filename: Yup.string().required('لطفا یک تصویر برای غذا انتخاب کنید'),
        size: Yup.number().max(3000000, "حجم تصویر نباید بیشتر از 3 مگابایت باشد"),
        mimeType: Yup.mixed().oneOf(["image/jpeg", "image/png"], "پسوند تصویر باید png یا jpg باشد")
    })
});


module.exports = schema;