---
layout: post
title: "How to Setup Multiple Git Accounts on Local Machine"
date: "2021-11-26"
tag:
  - "ssh"
  - "GitHub"
category:
  - "Git"
---

{% include toc %}

## How to use multiple accounts on your Mac?

> Decription: I have created a new GitHub account to experiment with some raw ideas. However, I want to set up this account on the same Mac I'm working with. In this way, I can choose to update both my usual git files and my experiment files with different accounts without messing up.

### Step 1 - Generate new keys for the account(email) on your Mac

Say your new account is: new-gh-acc
Your email associated with it is: your_new_email@example.com
Your Mac name is: your-mac-name

```terminal
ssh-keygen -t ed25519 -C "your_new_email@example.com"
```

When prompted, save this one with a suffix like \_new to use it later, e.g. `/Users/your-mac-name/.ssh/id_ed25519_new`

### Step 2 - Copy the new generated pub key file to add to GitHub SSH settings.

```terminal
cd ./~ssh
cat id_ed25519_new.pub
```

Copy the lines in the terminal and add them to the GitHub SSH settings, give it a catchy name.

### Step 3 - Add a config file to tell your local ssh agent which one to use/push when updating your projects

Still in the same folder ~/.ssh, create a config file and edit it with vim or text editor you choose.

```terminal
touch config
vim config
```

Then add these lines to the file:

```vim
#Default GitHub - original account
#The IdentityFile could also be sth different, depending on the original key file. If you use rsa to generate your key, then it should look sth like this: IdentityFile ~/.ssh/id_rsa
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519


Host github-new
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_new
```

### Step 4 - Update origin with the new identity

1. If you're creating a new repo (my-new-repo) with the new account, then it's a little simpler:

   1. Suppose you create a new repo with name test in your GitHub, then watch out, the usually steps are like this:

   ```
   echo "# my-new-repo" >> README.md
   git init
   git add README.md
   git commit -m "first commit"
   git branch -M main
   git remote add origin git@github.com:new-gh-acc/my-new-repo.git
   git push -u origin main
   ```

   2. But instead of git@github.com, we need to substitute github.com with the new host name github-new we just created. So it will be:

   ```
   git remote add origin git@github-new:new-gh-acc/my-new-repo.git
   ```

2. If you have already created a repo on the new account, then you clone this to your Mac, you need to _remove_ the old origin address, and update it with the new one just created.

   1. `git remote rm origin`
   2. `git remote add origin git@github-new:new-gh-acc/my-new-repo.git`

### Step 5 - Update local git config file with the new identity

1. This step is to make sure that we do not mess up the new git user name and email with the already set global name and email on our mac. In our local directory, open the config file: `git config --local -e`

2. Add the new info:

```
[user]
    name = new-gh-acc-name
    email = your_new_email@example.com
```

That's it!
Hope it's helpful!

### Useful links

- [Generating new ssh key and adding it to ssh-agent](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [Videos demo for this same problem](https://code.tutsplus.com/tutorials/quick-tip-how-to-work-with-github-and-multiple-accounts--net-22574)
- [Handling Multiple Github Accounts on MacOS](
