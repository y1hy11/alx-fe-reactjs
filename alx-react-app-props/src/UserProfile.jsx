import UserContext from "./UserContext";

const UserProfile = () => {
    return (
        <div >
            <h2>{UserContext.name}</h2>
            <p>Age: {UserContext.age}</p>
            <p>Bio: {UserContext.bio}</p>
        </div>
    );
};

export default UserProfile;