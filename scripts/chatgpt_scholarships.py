import openai
import gradio as gr

openai.api_key = "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"

# Assuming these are the inputs from another program
candidate_resume = """


"""
scholarship_info = """



"""

messages = [{"role": "system", "content": "Based on Candidate's resume and scholarship information, you are going to write a scholarship application for this candidate."}]
# Incorporate the external inputs into the conversation
messages.append({"role": "user", "content": f"Candidate Resume: {candidate_resume}\nScholarship Information: {scholarship_info}"})

def CustomChatGPT(user_input):
    messages.append({"role": "user", "content": user_input})

    response = openai.ChatCompletion.create(
        model="gpt-4-1106-preview",
        messages=messages
    )

    ChatGPT_reply = response.choices[0].message.content
    messages.append({"role": "assistant", "content": ChatGPT_reply})

    return ChatGPT_reply

# Create a Gradio Interface with a single text input for user interaction
demo = gr.Interface(fn=CustomChatGPT, inputs="text", outputs="text", title="Scholarship Application Assistant")

# Launch the application
demo.launch(share=True)