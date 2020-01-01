import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const BestAnecdotes = ({ voteList, anecdotes }) => {
    let highest = 0
    for (let i = 0; i < voteList.length; i++) {
        if (voteList[i] > voteList[highest]) {
            highest = i
        }
    }
    return (
        <>
            <h2>Anecdote with most votes</h2>
            <p>{anecdotes[highest]}</p>
        </>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf, 0))

    const addVotes = (props) => {
        console.log("setVotes", props)

        console.log("setVotes array", votes)
        console.log("setVotes selected", votes[selected])
        const copy = [...votes]
        console.log("copy:", copy)
        console.log("votes:", votes)
        copy[selected] = props
        setVotes(copy)
    }

    return (
        <>
            <h1>Anecdote of the day</h1>
            <div>
                {props.anecdotes[selected]}
            </div>
            <p>number of votes: {votes[selected]}</p>
            <Button onClick={() => addVotes(votes[selected] + 1)} text="vote" />
            <Button onClick={() => setSelected(getRandomInt(0, props.anecdotes.length))} text="next anecdote" />
            <BestAnecdotes voteList={votes} anecdotes={props.anecdotes} />

        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)