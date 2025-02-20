class Currency:

    # recommended mint=100, burn=0.0003
    def __init__(self):
        self.accounts = Storage('accounts')
        if 'centralAccount' not in self.accounts:
            self.accounts['centralAccount'] = {'balanceOf':0, 'creationTime': timestamp(), 'elapsedDays': 0}

    def create_account(self):
        self.accounts[master()] = {'balanceOf':0, 'creationTime': timestamp(), 'elapsedDays': 0}

    def check_balance(self, account, update = False):
        account_data = self.accounts[account].get_dict()
        # to count days divide by 86400. for testing, divide by 60
        time_passed = elapsed_time(account_data['creationTime'], timestamp()) / 60
        days_passed = round(time_passed - 0.5) - account_data['elapsedDays']
        if days_passed <= 0:
            return account_data['balanceOf']

        burnFactor = (100 - parameters('burn')) / 100
        mint = parameters('mint')
        for i in range(days_passed):
            account_data['balanceOf'] *= burnFactor
            account_data['balanceOf'] += mint
        account_data['elapsedDays'] += days_passed
        if update:
            self.accounts[account] = account_data
        return account_data['balanceOf']

    def transfer(self, to, value):
        sender = master()
        self.check_balance(sender, True)
        self.check_balance(to, True)

        sender_account = self.accounts[sender].get_dict()
        to_account = self.accounts[to].get_dict()
        if sender_account['balanceOf'] >= value:
            sender_account['balanceOf'] -= value
            to_account['balanceOf'] += value
            self.accounts[sender] = sender_account
            self.accounts[to] = to_account
            return True
        return False

    def get_balance(self):
        account = master()
        return self.check_balance(account)

    def before_parameters_update(self):
        for account in self.accounts:
            self.check_balance(account, True)
