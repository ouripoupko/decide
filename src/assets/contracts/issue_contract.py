class Issue:

    def __init__(self):
        self.details = Storage('details')
        self.comments = Storage('comments')
        self.proposals = Storage('proposals')
        self.votes = Storage('votes')

    def set_description(self, text):
        self.details['description'] = text

    def get_description(self):
        return self.details['description'].get_dict()
    
    def add_proposal(self, proposal):
        self.proposals.append(proposal)

    def get_proposals(self):
        return [self.proposals[key].get_dict() for key in self.proposals]
    
    def get_issue(self):
        return {
            'description': self.get_description(),
            'proposals': self.get_proposals(),
            'votes': {}
        }