import React, {forwardRef, useState, useEffect} from 'react';
import InstagramIcon from "../statics/instagram.svg"
import FacebookIcon from "../statics/facebook.svg"
import TwitterIcon from "../statics/twitter.svg"
import DiscordIcon from "../statics/discord.svg"
import WhatsappIcon from "../statics/whatsapp.svg"

const Social = forwardRef((props, ref) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(props.data);
    })

    const matchIcons = (platform) => {
        if (platform === "facebook") {
            return FacebookIcon
        } else if (platform === "instagram") {
            return InstagramIcon
        } else if (platform === "discord") {
            return DiscordIcon
        } else if (platform === "whatsapp") {
            return WhatsappIcon
        } else {
            return TwitterIcon
        }
    }

    return (
        <div ref={ref} className="social">
            <div className="social-wrapper">
                <div className="fade title light-text">Follow Our <span className="anim-text purple-text">Socials</span></div>
                <div className='fade icon-wrappers'>
                    {
                        data.map(e => {
                            return (
                                <div className="icons">
                                    <a href={e.href} target="_blank">
                                        <img src={matchIcons(e.platform)} alt='logo'></img>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="copyright">
                {"Copyright © "}
                <a target="_blank" href="https://github.com/lennonchoong/">
                    https://github.com/lennonchoong
                </a>
                {" "}
                {new Date().getFullYear()}
                {"."}
            </div>
        </div>
    )
})

export default Social;