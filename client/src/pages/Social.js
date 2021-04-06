import React, {forwardRef} from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

const Social = forwardRef((props, ref) => {
    return (
        <div ref={ref} className="social">
            <div className="social-wrapper">
                <div className="fade title light-text">Follow Our <span className="anim-text purple-text">Socials</span></div>
                <div className='fade icon-wrappers'>
                    <InstagramIcon />
                    <FacebookIcon />
                    <TwitterIcon />
                </div>
            </div>
        </div>
    )
})

export default Social;