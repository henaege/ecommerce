import React, {Component} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Image} from 'react-bootstrap'

class Slick extends Component{
    render(){
        const settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        }
        return(
            
                <Slider {...settings}>
                    <div className="slick-image"><Image src="/images/ferrari.jpg" alt="" responsive/>
                    </div>
                    <div className="slick-image"><Image src="/images/train1.jpg" alt="" responsive/>
                    </div>
                    <div className="slick-image"><Image src="/images/lamb.jpg" alt="" responsive/>
                    </div>
                    <div className="slick-image"><Image src="/images/schooner.jpg" alt="" responsive/>
                    </div>
                </Slider>
            
        )
    }
}

export default Slick