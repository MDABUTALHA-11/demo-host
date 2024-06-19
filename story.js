// script.js

const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');
const storyImageElement = document.getElementById('story-image');

const story = {
    start: {
        text: "You wake up in a dark forest. There are paths to the left and right.",
        image: "image.game/forest.jpg",
        choices: [
            { text: "Go left", next: 'leftPath' },
            { text: "Go right", next: 'rightPath' }
        ]
    },
    leftPath: {
        text: "You see a river. Do you want to swim across or follow the river?",
        image: "image.game/river.jpg",
        choices: [
            { text: "Swim across", next: 'swim' },
            { text: "Follow the river", next: 'followRiver' }
        ]
    },
    rightPath: {
        text: "You encounter a wolf! Do you want to fight or run?",
        image: "image.game/wolf.jpg",
        choices: [
            { text: "Fight", next: 'fightWolf' },
            { text: "Run", next: 'runAway' }
        ]
    },
    swim: {
        text: "You swim across and find a cave entrance. Do you want to enter the cave or go back?",
        image: "image.game/canva.jpg",
        choices: [
            { text: "Enter the cave", next: 'cave' },
            { text: "Go back", next: 'leftPath' }
        ]
    },
    followRiver: {
        text: "You follow the river and find a village. You are safe!",
        image: "image.game/village.jpeg",
        choices: [
            { text: "Start over", next: 'start' }
        ]
    },
    fightWolf: {
        text: "The wolf is too strong. You lose.",
        image: "image.game/wolf(26).jpeg",
        choices: [
            { text: "Start over", next: 'start' }
        ]
    },
    runAway: {
        text: "You safely escape and find a cabin in the woods. Do you want to enter the cabin or continue running?",
        image: "image.game/cabin.jpg",
        choices: [
            { text: "Enter the cabin", next: 'cabin' },
            { text: "Continue running", next: 'runFurther' }
        ]
    },
    cave: {
        text: "Inside the cave, you find a mysterious artifact. Do you want to take it or leave it?",
        image: "image.game/artifact (26).jpeg",
        choices: [
            { text: "Take the artifact", next: 'takeArtifact' },
            { text: "Leave it", next: 'leaveArtifact' }
        ]
    },
    cabin: {
        text: "Inside the cabin, you find supplies and a map. You decide to rest and plan your next move.",
        image: "image.game/map.jpeg",
        choices: [
            { text: "Start over", next: 'start' }
        ]
    },
    runFurther: {
        text: "You find a hidden path leading to a secret garden. You are safe!",
        image: "image.game/garden.jpg",
        choices: [
            { text: "Start over", next: 'start' }
        ]
    },
    takeArtifact: {
        text: "As you take the artifact, the cave starts to collapse! You barely escape with your life, but the artifact is yours.",
        image: "image.game/hero.jpg",
        choices: [
            { text: "Start over", next: 'start' }
        ]
    },
    leaveArtifact: {
        text: "You leave the artifact and safely exit the cave, deciding it's best not to mess with unknown powers.",
        image: "image.game/hero2.jpg",
        choices: [
            { text: "Start over", next: 'start' }
        ]
    }
};

function startGame() {
    showStoryNode('start');
}

function showStoryNode(nodeKey) {
    const node = story[nodeKey];
    storyElement.innerText = node.text;
    storyImageElement.src = node.image;
    choicesElement.innerHTML = '';
    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.className = 'choice-button';
        button.addEventListener('click', () => showStoryNode(choice.next));
        choicesElement.appendChild(button);
    });
}

startGame();
