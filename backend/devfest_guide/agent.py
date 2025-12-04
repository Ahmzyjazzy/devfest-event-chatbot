from google.adk.agents.llm_agent import Agent

from .prompt import ROOT_AGENT_INSTRUCTION

root_agent = Agent(
    model='gemini-2.0-flash-001',
    name='root_agent',
    description='Devfest Ogbomoso Event Guide Assistant',
    instruction=ROOT_AGENT_INSTRUCTION,
)
