import React from 'react';
import PollCard from '../poll/poll_card';
 
const Voting = () => {
    return (
        <div style={{ maxWidth: '80%', margin: '0 auto', padding: '2vh' }}>
            <h1>Welcome to the Voting page</h1>

            <PollCard
                date="2023-12-04"
                title="Electoral Voting Title"
                result="accepted"
                party="Example Party"
                additionalInfo="Additional information about the voting..."
            />
            <PollCard
                date="2023-12-04"
                title="Another Voting Title"
                result="rejected"
                party="Another Party"
                additionalInfo="More details about the voting..."
            />
        </div>
    );
};
 
export default Voting;