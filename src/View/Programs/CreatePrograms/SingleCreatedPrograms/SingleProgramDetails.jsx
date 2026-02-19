import Slider from 'react-slick'
import bigImg from '../../../../assets/Rectangle 445.png'
import smallImg from '../../../../assets/Rectangle 6614.png'
import smallImg1 from '../../../../assets/Rectangle 6615.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';
const SingleProgramDetails = ({ singleData }) => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    const [imageSrc, setimageSrc] = useState('')
    return (
        <>

            <div className='one_time_service_details_wrapper'>
                <div className='left_one_time_service'>
                    <div className='service_big_img'>
                        {(singleData?.main_image && !imageSrc) && <img src={singleData?.main_image} />}
                        {imageSrc && <img src={imageSrc} />}
                    </div>
                    <div className='service_small_img_wrapper'>
                        <Slider {...settings}>
                            {singleData?.gallery_images?.length > 0 && singleData?.gallery_images?.map((e, i) => (
                                <div key={i} className='service_small_img'>
                                    <img onClick={(() => setimageSrc(e.image_path))} src={e.image_path
                                    } />
                                </div>
                            ))}
                        </Slider>


                    </div>
                </div>
                <div className='right_one_time_service_details'>
                    {singleData?.tag && <small>{singleData?.tag}</small>}
                    <div>
                        {singleData?.original_price
                            && <del>SAR{singleData?.original_price}</del>}
                        {singleData?.
                            sale_price
                            && <h1>SAR{singleData?.
                                sale_price}</h1>}
                    </div>
                    <span><strong>Categories: </strong>{singleData?.program_category
                        ?.name}</span>
                    <span><strong>Occurrence: </strong>{singleData?.occurrence_type}</span>
                    <span><strong>Duration: </strong>32 weeks</span>

                    {singleData?.description && <p>{singleData?.description}
                    </p>}

                </div>
            </div>
        </>
    )
}

export default SingleProgramDetails
