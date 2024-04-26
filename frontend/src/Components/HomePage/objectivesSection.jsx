import React from 'react'

function ObjectivesSection() {
    return (
        <section id='objectives' className='container' style={{ paddingTop: '6rem' }}>
            <div>
                <h1 className="d-flex justify-content-center align-items-center fw-600 text-black fs-2 fs-sm-2 pb-4">
                    أهدافنا
                </h1>
                <div className="cards d-flex flex-wrap justify-content-evenly">
                    <div className="d-flex flex-row flex-wrap justify-content-center align-items-center align-items-md-stretch">
                        <div className="card col-12 col-lg-5 m-3">
                            <h5 className="card-header fw-500 fs-1_5">
                                سد الفجوة
                            </h5>
                            <div className="card-body">
                                <p className="card-text fs-1_25">
                                    ربط الجهات المانحة والمستفيدين لضمان وصول المساعدات إلى من هم في أمس الحاجة إليها
                                </p>
                            </div>
                        </div>
                        <div className="card col-12 col-lg-5 m-3">
                            <h5 className="card-header fw-500 fs-1_5">
                                تبسيط العمليات
                            </h5>
                            <div className="card-body">
                                <p className="card-text fs-1_25">
                                    توفير أدوات فعالة لإدارة توزيع المساعدات، والحد من التعقيدات وزيادة التركيز على الخدمة
                                </p>
                            </div>
                        </div>
                        <div className="card col-12 col-lg-5 m-3">
                            <h5 className="card-header fw-500 fs-1_5">
                                تعظيم الأثر
                            </h5>
                            <div className="card-body">
                                <p className="card-text fs-1_25">
                                    تعزيز فعالية التوزيعات الخيرية، مما يجعل كل مورد له أهمية في تحسين حياة الناس
                                </p>
                            </div>
                        </div>
                        <div className="card col-12 col-lg-5 m-3">
                            <h5 className="card-header fw-500 fs-1_5">
                                تعزيز الشفافية
                            </h5>
                            <div className="card-body">
                                <p className="card-text fs-1_25">
                                    الحفاظ على قنوات اتصال واضحة ومفتوحة بين جميع الأطراف المشاركة في عملية توزيع المساعدات
                                </p>
                            </div>
                        </div>
                        <div className="card col-12 col-lg-5 m-3">
                            <h5 className="card-header fw-500 fs-1_5">
                                التحسين الاجتماعي
                            </h5>
                            <div className="card-body">
                                <p className="card-text fs-1_25">
                                    الالتزام بتحسين المجتمع من خلال معالجة القضايا الاجتماعية من خلال المساعدات المستهدفة، وتعزيز ثقافة التعاطف، ورعاية مجتمع تتاح فيه الفرصة لكل فرد للازدهار
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ObjectivesSection
