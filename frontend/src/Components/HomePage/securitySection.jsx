import React from 'react'

function SecuritySection() {
    return (
        <section id="security" className='SecuritySection text-white pt-6_0'>
            <div className="bg-brown-500">
                <div className='container pb-4 pb-sm-5 pt-5'>
                    <h1 className="d-flex justify-content-center align-items-center fw-600 fs-2 fs-sm-2 pb-4">
                        الحماية
                    </h1>
                    <div className='fs-1_5 col-12 col-lg-11 pb-4 m-auto'>
                        في العصر الرقمي، تُعد خصوصية المعلومات الشخصية أمرًا بالغ الأهمية. ونحن في ساعد | SA_AID، نلتزم التزاماً راسخاً بحماية خصوصية مستخدمينا. منصتنا محصنة من خلال:
                    </div>
                    <div className="d-flex flex-row flex-wrap justify-content-center align-items-stretch pb-4">
                        <div className="col-12 col-md-4 col-lg-3 m-3">
                            <h5 className="d-flex flex-row align-items-center gap-2">
                                <i className="bi bi-shield-check"></i>
                                <div className='fw-500 fs-1_5'>
                                    التشفير
                                </div>
                            </h5>
                            <div className="fs-1_25">
                                حماية البيانات باستخدام أحدث تقنيات التشفير المتطورة لضمان الحفاظ على سرية المعلومات الحساسة
                            </div>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 m-3">
                            <h5 className="d-flex flex-row align-items-center gap-2">
                                <i className="bi bi-journal-check"></i>
                                <div className='fw-500 fs-1_5'>
                                    عمليات التدقيق المنتظمة
                                </div>
                            </h5>
                            <div className="fs-1_25">
                                إجراء فحوصات أمنية شاملة وعمليات تدقيق للحفاظ على أعلى معايير سلامة البيانات
                            </div>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 m-3">
                            <h5 className="d-flex flex-row align-items-center gap-2">
                                <i className="bi bi-people-fill"></i>
                                <div className='fw-500 fs-1_5'>
                                    التحكم في المستخدم
                                </div>
                            </h5>
                            <div className="fs-1_25">
                                تمكين المؤسسات بأدوات للتحكم في الوصول وإدارة الصلاحيات، مما يضمن عدم وصول البيانات إلا للأشخاص المصرح لهم فقط
                            </div>
                        </div>
                    </div>
                    <div className='fs-1_5 col-12 col-lg-11 pb-4 m-auto'>
                        نتعهد بالحفاظ على بيئة آمنة، الخصوصية فيها ليست مجرد سياسة، بل وعد...
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SecuritySection;
