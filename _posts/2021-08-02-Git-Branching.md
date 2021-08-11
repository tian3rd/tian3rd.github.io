---
layout: post
last_modified_at: 2021-08-06
---

> Practice makes artisan.

{% include toc %}

## Basics

If come across any problems, first use `tldr git <command>` to look it up.
The official guide is <https://git-scm.com/docs>
Also, there are some handy tools to solidate the knowledge such as <https://learngitbranching.js.org>

### Introduction to Git Commits

1. Branch early, and branch often.

```terminal
<!-- use git switch for future versions of git -->
git branch newImage
git checkout newImage
```

It's equivalent to `git checkout -b <newbranch>`

2. Merging...

3. Rebasing...
   Rebasing essentially takes a set of commits, "copies" them, and plops them down somewhere else. The advantage of rebasing is that it can be used to make a nice linear sequence of commits. The commit log / history of the repository will be a lot cleaner if only rebasing is allowed.

### Ramping up

1. `HEAD`
   `HEAD` is the symbolic name for the currently checked out commit -- it's essentially what commit you're working on top of. `HEAD` always points to the most recent commit which is reflected in the working tree. Most git commands which make changes to the working tree will start by changing `HEAD`. Normally `HEAD` points to a branch name (like bugFix). When you commit, the status of bugFix is altered and this change is visible through `HEAD`.

2. Detaching `Head`
   Detaching HEAD just means attaching it to a commit instead of a branch.

3. Relative Refs
   Git is smart about hashes. It only requires you to specify enough characters of the hash until it uniquely identifies the commit.
   With relative refs, you can start somewhere memorable (like the branch `bugFix` or `HEAD`) and work from there.

- Moving upwards one commit at a time with `^`
  Each time you append a caret `^` to a ref name, you are telling Git to find the parent of the specified commit. So saying `main^` is equivalent to "the first parent of `main`". `main^^` is the grandparent (second-generation ancestor) of `main`. You can also reference `HEAD` as a relative ref.

- Moving upwards a number of times with `~<num>`
  - The tilde operator (optionally) takes in a trailing number that specifies the number of parents you would like to ascend.

The `~` operator
One of the most common ways to use relative refs is to move branches around. You can directly reassign a branch to a commit with the `-f` option. So something like: `git branch -f main HEAD~3` moves (by force) the main branch to three parents behind HEAD.

4. Reversing changes in Git

There are two primary ways to undo changes in Git -- one is using `git reset` and the other is using `git revert`.

`git reset` reverses changes by moving a branch reference backwards in time to an older commit. In this sense you can think of it as "rewriting history;" `git reset` will move a branch backwards as if the commit had never been made in the first place.

While resetting works great for local branches on your own machine, its method of "rewriting history" doesn't work for remote branches that others are using. In order to reverse changes and share those reversed changes with others, we need to use `git revert`.
A new commit plopped down below the commit we wanted to reverse. That's because this new commit introduces changes -- it just happens to introduce changes that exactly reverses the commit of old changes. With reverting, you can push out your changes to share with others.

### Moving Work Around

Modify the source tree

1. Cherry-pick
   `git cherry-pick <Commit1> <Commit2> <...>`

2. Interactive rebase
   `git rebase -i <>`

### A Mixed Bag

Tricks and tips

1. Locally stacked commits

Here's a development situation that often happens: I'm trying to track down a bug but it is quite elusive. In order to aid in my detective work, I put in a few debug commands and a few print statements. All of these debugging / print statements are in their own commits. Finally I track down the bug, fix it, and rejoice! Only problem is that I now need to get my bugFix back into the main branch. If I simply fast-forwarded main, then main would get all my debug statements which is undesirable. There has to be another way...

2. Juggling commits

Here's another situation that happens quite commonly. You have some changes (newImage) and another set of changes (caption) that are related, so they are stacked on top of each other in your repository (aka one after another). The tricky thing is that sometimes you need to make a small modification to an earlier commit. In this case, design wants us to change the dimensions of newImage slightly, even though that commit is way back in our history!!

We will overcome this difficulty by doing the following:

- We will re-order the commits so the one we want to change is on top with git rebase -i
- We will git commit --amend to make the slight modification
- Then we will re-order the commits back to how they were previously with git rebase -i
- Finally, we will move main to this updated part of the tree to finish the level (via the method of your choosing)

We used rebase -i to reorder the commits. Once the commit we wanted to change was on top, we could easily --amend it and re-order back to our preferred order. The only _issue_ here is that there is a lot of reordering going on, which can introduce rebase conflicts. Let's look at another method with git cherry-pick.

`git cherry-pick` will plop down a commit from anywhere in the tree onto `HEAD` (as long as that commit isn't an ancestor of `HEAD`).

3. Git tags

Branches are easy to move around and often refer to different commits as work is completed on them. Branches are easily mutated, often temporary, and always changing. Git tags support this exact use case -- they (somewhat) permanently mark certain commits as "milestones" that you can then reference like a branch. More importantly though, they never move as more commits are created. You can't "check out" a tag and then complete work on that tag -- tags exist as anchors in the commit tree that designate certain spots. If you leave the commit off, git will just use whatever `HEAD` is at.

4. Git Describe

Because tags serve as such great "anchors" in the codebase, git has a command to describe where you are relative to the closest "anchor" (aka tag). And that command is called `git describe`! Git describe can help you get your bearings after you've moved many commits backwards or forwards in history; this can happen after you've completed a `git bisect` (a debugging search) or when sitting down at a coworkers computer who just got back from vacation.

`git describe <ref>`

Where `<ref>` is anything git can resolve into a commit. If you don't specify a ref, git just uses where you're checked out right now (`HEAD`).

The output of the command looks like:

`<tag>_<numCommits>_g<hash>`

Where `tag` is the closest ancestor tag in history, `numCommits` is how many commits away that tag is, and `<hash>` is the hash of the commit being described.

### Advanced topics

1. Rebasing multiple times

2. Multiple parents

Like the `~` modifier, the `^` modifier also accepts an optional number after it. Rather than specifying the number of generations to go back (what `~` takes), the modifier on `^` specifies which parent reference to follow from a merge commit. Remember that merge commits have multiple parents, so the path to choose is ambiguous. Git will normally follow the "first" parent upwards from a merge commit, but specifying a number with `^` changes this default behavior.

3. Branch spaghetti

### Push & Pull -- Git Remotes!

1. Git clone

2. Remote branches
   Remote branches `<remote name>/<branch name>` have the properties that when you check them out, you are put inot detached `HEAD` mode.

3. Fetch
   `git fetch` (sync): 1. download commits local doesn't have; 2. updates where our remote branch points (e.g. `origin/main`). It _doesn't_ do: doesn't change anything about local state.

4. Pull
   Once you have new commits locally, you can incorporate them as if they were just commits on other branches! This means you could execute commands like:
   `git cherry-pick o/main`
   `git rebase o/main`
   `git merge o/main`
   In fact, the workflow of fetching remote changes and then merging them is so common that git actually provides a command that does both at once! That command is `git pull`.

5. Push
   `git push` is responsible for uploading your changes to a specified remote and updating that remote to incorporate your new commits. Once `git push` completes, all your friends can then download your work from the remote
   `git push` with no argument varies depending on `push.default`

6. Diverged work
   Imagine you clone a repository on Monday and start dabbling on a side feature. By Friday you are ready to publish your feature -- but oh no! Your coworkers have written a bunch of code during the week that's made your feature out of date (and obsolete). They've also published these commits to the shared remote repository, so now your work is based on an old version of the project that's no longer relevant.
   In this case, the command `git push` is ambiguous. If you run `git push`, should git change the remote repository back to what it was on Monday? Should it try to add your code in while not removing the new code? Or should it totally ignore your changes since they are totally out of date?
   Because there is so much ambiguity in this situation (where history has diverged), git doesn't allow you to push your changes. It actually forces you to incorporate the latest state of the remote before being able to share your work.

7. Remote Rejected! (Locked Main)
   Why was it rejected?
   The remote rejected the push of commits directly to main because of the policy on main requiring pull requests to instead be used. You meant to follow the process creating a branch then pushing that branch and doing a pull request, but you forgot and committed directly to main. Now you are stuck and cannot push your changes.
   The _solution_
   Create another branch called feature and push that to the remote. Also reset your main back to be in sync with the remote otherwise you may have issues next time you do a pull and someone else's commit conflicts with yours.

### Rename both local and remote branches

## Settings

### Apply gitignore configurations

1. Commit all pending changes.
2. `git rm -r --cached .`: remove everything from the repo index (keep it untoched _locally_).
3. `git add .`: add all files (including `.gitignore` modified/created just now).
4. `git commit -m your_message`
5. `git push origin main`

### Add multiple accounts on Mac

> Decription:
> I have created a new GitHub account to experiment with some raw ideas. However, I want to set up this account on the same Mac I'm working with. In this way, I can choose to update both my usual git files and my experiment files with different accounts without messing up.

**Step 1 - Generate new keys for the account(email) on your Mac**

Say your new account is: new-gh-acc
Your email associated with it is: your_new_email@example.com
Your Mac name is: your-mac-name

```terminal
ssh-keygen -t ed25519 -C "your_new_email@example.com"
```

When prompted, save this one with a suffix like \_new to use it later, e.g. `/Users/your-mac-name/.ssh/id_ed25519_new`

**Step 2 - Copy the new generated pub key file to add to GitHub SSH settings.**

```terminal
cd ./~ssh
cat id_ed25519_new.pub
```

Copy the lines in the terminal and add them to the GitHub SSH settings, give it a catchy name.

**Step 3 - Add a config file to tell your local ssh agent which one to use/push when updating your projects**

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

**Step 4 - Update origin with the new identity**

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

**Step 5 - Update local git config file with the new identity**

1. This step is to make sure that we do not mess up the new git user name and email with the already set global name and email on our mac. In our local directory, open the config file: `git config --local -e`

2. Add the new info:

```
[user]
    name = new-gh-acc-name
    email = your_new_email@example.com
```

That's it!
Hope it's helpful!

**Useful links**

- [Generating new ssh key and adding it to ssh-agent](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [Videos demo for this same problem](https://code.tutsplus.com/tutorials/quick-tip-how-to-work-with-github-and-multiple-accounts--net-22574)
- [Handling Multiple Github Accounts on MacOS](https://gist.github.com/Jonalogy/54091c98946cfe4f8cdab2bea79430f9)
- [Gitlab Multiple Accounts](https://medium.com/uncaught-exception/setting-up-multiple-gitlab-accounts-82b70e88c437)
