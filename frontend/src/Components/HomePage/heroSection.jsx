import React from 'react'

function HeroSection() {
    return (
        <section className="HeroSection">
            <div className="content d-flex align-items-sm-center pt-6_0">
                <div className="container d-flex flex-column justify-content-center justify-content-sm-start align-items-center align-items-sm-start">
                    <h1 className='col-10 text-center text-sm-end fs-3 fs-sm-2 fw-900 pt-2 pt-sm-0 pb-3'>
                        أهلا بك في ساعد | SA-AID
                    </h1>
                    <p className='col-12 text-center text-sm-end fs-1_25 pb-3 mb-2'>
                        <span className="d-inline d-sm-none">
                            منصة تساعد على إدارة بياناتك بكفاءة، مما يضمن توزيع المساعدات، بدقة وعناية لمن هم في أمس الحاجة إليها
                        </span>
                        <span className="d-none d-sm-inline">
                            في عالم يمكن أن يكون العطف فيه أعظم عملة، تعمل منصة ساعد كحلقة وصل حيوية بين المنظمات الاجتماعية والمجتمعات التي تدعمها. إن منصتنا هي المكان الأفضل لإدارة بياناتك بكفاءة، مما يضمن توزيع المساعدات، مثل المغذيات والأدوية والدعم المالي والملابس والأجهزة الكهربائية وغيرها، بدقة وعناية لمن هم في أمس الحاجة إليها.
                            <br /><br />
                            قم بتمكين مهمتك مع ساعد. نحن نقدم الأدوات اللازمة لتبسيط عملياتك، مما يتيح لك زيادة تأثير توزيعاتك الخيرية إلى أقصى حد معًا، يمكننا أن نبني مستقبلًا يصل فيه كل عمل خيري إلى وجهته المقصودة.
                        </span>
                        <br /><br />
                        ابدأ رحلتك معنا وقم بتحويل مشهد المساعدات المجتمعية.
                    </p>
                    <button className='button'>تسجيل الدخول</button>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;
