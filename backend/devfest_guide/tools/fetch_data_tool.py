from typing import Dict, Any
from devfest_guide.data.speakers import SPEAKERS
from devfest_guide.data.agenda import AGENDA
from devfest_guide.data.team import TEAM
from devfest_guide.data.faqs import FAQS


def get_speakers() -> Dict[str, Any]:
    """
    Get speakers for DevFest Ogbomoso 2025
    
    Returns:
        if success: A dictionary with status as success and list of speakers as data
        if error: A dictionary with status as error and error message 
    """
    try:
        return {"status": "success", "data": SPEAKERS}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def get_agenda() -> Dict[str, Any]:
    """
    Get agenda for DevFest Ogbomoso 2025
    
    Returns:
        if success: A dictionary with status as success and list of agenda as data
        if error: A dictionary with status as error and error message 
    """
    try:
        return {"status": "success", "data": AGENDA}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def get_team() -> Dict[str, Any]:
    """
    Get team for DevFest Ogbomoso 2025
    
    Returns:
        if success: A dictionary with status as success and list of team as data
        if error: A dictionary with status as error and error message 
    """
    try:
        return {"status": "success", "data": TEAM}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def get_faqs() -> Dict[str, Any]:
    """
    Get faqs for DevFest Ogbomoso 2025
    
    Returns:
        if success: A dictionary with status as success and list of faqs as data
        if error: A dictionary with status as error and error message 
    """
    try:
        return {"status": "success", "data": FAQS}
    except Exception as e:
        return {"status": "error", "message": str(e)}   