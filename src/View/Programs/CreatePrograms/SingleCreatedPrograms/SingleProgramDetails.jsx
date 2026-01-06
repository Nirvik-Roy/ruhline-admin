import bigImg from '../../../../assets/Rectangle 445.png'
import smallImg from '../../../../assets/Rectangle 6614.png'
import smallImg1 from '../../../../assets/Rectangle 6615.png'
import { useNavigate } from 'react-router-dom'
const SingleProgramDetails = () => {
        const navigate = useNavigate()
  return (
    <>
            <div className='one_time_service_details_wrapper'>
                <div className='left_one_time_service'>
                    <div className='service_big_img'>
                        <img src={bigImg} />
                    </div>
                    <div className='service_small_img_wrapper'>
                        {[smallImg, smallImg1, smallImg, smallImg1].map((e, i) => (
                            <div key={i} className='service_small_img'>
                                <img src={e} />
                            </div>
                        ))}

                    </div>
                </div>
                <div className='right_one_time_service_details'>
                    <small>Best Selling</small>
                    <div>
                        <del>SAR97</del>
                        <h1>SAR67</h1>
                    </div>
                    <span><strong>Categories: </strong>Yoga, Yoga Sub-Category 1</span>
                    <span><strong>Occurrence: </strong>Recurring</span>
                    <span><strong>Duration: </strong>32 weeks</span>

                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. <br /> <br />
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam.Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam.Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam.
                    </p>

                </div>
            </div>
    </>
  )
}

export default SingleProgramDetails
