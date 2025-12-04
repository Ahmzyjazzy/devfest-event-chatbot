from google.adk.agents.llm_agent import Agent

from .tools.google_search_tool import google_search_grounding
from .tools.fetch_data_tool import (
    get_speakers,
    get_agenda,
    get_team,
    get_faqs,
)
from .prompt import ROOT_AGENT_INSTRUCTION

root_agent = Agent(
    model='gemini-2.0-flash-001',
    name='devfest_guide',
    description='Devfest Ogbomoso Event Guide Assistant',
    instruction=ROOT_AGENT_INSTRUCTION,
    tools=[
        google_search_grounding,
        get_speakers,
        get_agenda,
        get_team,
        get_faqs,
    ],
)
