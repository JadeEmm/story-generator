# Story Generator

A Next.js application that allows users to manage characters and generate stories using the GPT-2 model from Hugging Face. 

## Setup
To run this project locally:
- Clone the repository.
- Install dependencies with `npm install`.
- Start the development server with `npm run dev`.


## **Features**

- Add, edit, and delete characters
- Generate a story using the GPT-2 model based on user-created characters
- Display generated stories and character details

## **Setup Instructions**

### **1. Clone the Repository**

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/story-generator.git
cd story-generator

2. Install Dependencies
Install the required Node.js packages:

npm install

3. Set Up Environment Variables
You need to configure your environment to use the Hugging Face API. Follow these steps:

Create an API Key:

Sign up at Hugging Face if you haven't already.
Generate an API key from your Hugging Face account settings.
Create a .env.local File:

In the root of the project directory, create a file named .env.local.

touch .env.local
 

Add Your API Key:

Open the .env.local file in a text editor.
Add your Hugging Face API key to the file:
HUGGINGFACE_API_KEY=your_hugging_face_api_key_here

Save the file.
4. Run the Application
Start the development server:

npm run dev

The application will be available at http://localhost:3000/characters.

Usage
Add Characters: Enter the character's name, description, and personality in the form on the /characters page and click "Add Character".
Edit Characters: Click the "Edit" button next to a character to update its details.
Delete Characters: Click the "Delete" button next to a character to remove it.
Generate Story: After adding characters, click "Generate Story" to create a story using the GPT-2 model.
Troubleshooting
Missing .env.local File: If you encounter errors related to environment variables, ensure that your .env.local file is correctly set up with the Hugging Face API key.

Port Issues: If http://localhost:3000 is already in use, you can specify a different port by running:

bash
Copy code
npm run dev -- -p 3001
Installation Errors:

Make sure Node.js is installed correctly on your machine. You can verify this by running:

bash
Copy code
node -v
npm -v
If you encounter issues with installing dependencies, try deleting the node_modules directory and package-lock.json file, then run npm install again: