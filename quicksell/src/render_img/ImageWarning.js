
import "./ImageWarning.css";
import { data } from "./data";
import warning  from "../assets/warning.PNG";


const  ImageWarning = ({ }) => {
    let flag = false
    const imageLink = []

    data.forEach((item, index) =>  { 
        if ((item.images.ready == true )  && (item.images.error == false )) {
            imageLink.push(item.images.url)
        } else {
            flag = true
        }
    });

    const addDefaultSrc = (e, image) => {
        for(let i=0; i< 4; i ++) {
            setTimeout(() => LoadImage(image.data), 5000)
        }
        e.target.src = '/static/media/warning.56117758.PNG'
    };

    const LoadImage = (image) => {
        console.log(image)
        return (
            <img onError={(e) => {addDefaultSrc(e,image)}}  src={image.data} alt={warning}/>
        );
    };

    return (
        <div className="mainContainer">
            <section className="columns">
        
                <div className="column first-col">
                    <div className="first">
                        <LoadImage data={data[0].images.url} />
                        <LoadImage data={data[1].images.url} />
                    </div>
                    <div className="second">
                        <LoadImage data={data[2].images.url} />
                        { data.length === 3 ?
                            <LoadImage data={data[3].images.url} />
                            : <div className="placeholder"></div>
                        }
                    </div>
                </div>
                
                <div className="column text">
                    <h2>Test design</h2>
                    <h4>{imageLink.length} Product</h4>
                </div>
            
                {flag === true && (
                <div className="column last">
                    <img src={warning} />
                </div>
                )}
                
            </section>
        </div>	
                
    );
};

export default ImageWarning