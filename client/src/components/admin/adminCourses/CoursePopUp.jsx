import { useState } from 'react';
import './admincourses.css';

const CoursePopUp = (props) => {
    const { lectures = [] } = props;


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState("");
    const [videoPrev, setVideoPrev] = useState("");

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setVideoPrev(reader.result);
                setVideo(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const closePageBtn = () => {
        props.setTrigger(false);
        setTitle("");
        setDescription("");
        setVideo("");
        setVideoPrev("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addLecture(title, description, video);
        closePageBtn();
    };
    return (props.trigger) ? (

        <div className="coursepopup">

            <div className="coursepopupleft">
            <button className='closeBtn' onClick={closePageBtn}>Back</button>
                <div className="coursepopupleftInner">

                    <h1>{props.title}</h1>
                    <p>{`#${props.id}`}</p>
                    <h2>Lectures</h2>
                    {
                        lectures.map((item, i) => {
                            return (

                                <VideoCard
                                    key={item._id || i}
                                    title={item.title}
                                    description={item.description}
                                    num={i + 1}
                                    videoUrl={item.video.url}
                                    lectureId={item._id}
                                    courseId={props.id}
                                    deleteBtn={props.deleteBtn}
                                />
                            )
                        })

                    }

                </div>
                
            </div>
            <div className="coursepopupright">
                <form onSubmit={handleSubmit}>
                    <h1>Add Lecture</h1>

                    <input type="text" placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />

                    <input type="text" placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />

                    <div className="video">
                        <input type="file" accept="video/mp4" onChange={handleVideoChange} />
                    </div>

                    {
                        videoPrev && (
                            <div className="preVideo">
                                <video controlsList='nodownload'
                                    controls
                                    src={videoPrev}
                                />
                            </div>
                        )
                    }

                    <button type='submit'>Upload Lecture</button>
                </form>
                
            </div>
            
        </div>
    ) : "";
}

export default CoursePopUp;


function VideoCard(props) {
    return (
        <>
            <div className="videoCard">
                <div className="lectureData">
                    <h3>{`#${props.num} ${props.title}`}</h3>
                    <p>{props.description}</p>
                    <video className="preVideo" controls src={props.videoUrl}>
                    Your browser does not support the video tag.
                    </video>
                    <button onClick={() => props.deleteBtn(props.courseId, props.lectureId)} >
                        Delete</button>
                </div>
            </div>
        </>
    )
}
