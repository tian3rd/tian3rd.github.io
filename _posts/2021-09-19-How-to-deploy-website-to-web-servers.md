---
layout: post
tag:
  - "js"
  - "tutorial notes"
  - "terminal"
  - "ssh"
category:
  - "Linux"
  - "Website"
---

> "I do what I do." --Kobe Bryant

{% include toc %}

## Prep work

1. Register a domain name using GoDaddy, Name.com, Namecheap.com, etc
2. Register a DigitalOcean account for the new server (VPS, virtual private server)
3. A stable wifi and a cup of tea to calm down when things don't work out as expected

Note: make use of the GitHub student pack if you're a student!

## Configure the new server

### Create a new Droplet on DigitalOcean

Inside DigitalOcean Panel:

"Create"
--> "Create Droplets"
--> Select Ubuntu LTS as an image
--> Choose a standard plan of $5/m (1GB CPU + 25GB SSD + 1000GB Transfer)
--> Choose a datacenter nearest to you --> Create a root password to access Droplet (will be disallowed in the next steps and be replaced with `ssh` keys)
--> Choose a hostname to remember
--> "Create Droplet"

When it's all set up (can take a while), take notes of the IP address (e.g., 10.20.30.40) of your Droplet. (Also, don't forget the complex password before)

### Access New Server on Your Local Terminal

1. `ssh` our way in the server using the password just created

```bash
ssh root@10.20.30.40
```

2. Create a new user with `sudo` access

   1. Now logged in as a `root` user, we can add new user using `adduser phil`, and type in a new password for this new user for him to `ssh` later.
   2. To give him the `sudo` access, we need to add him to the `sudo` group on the machine:
      `usermod -a -G sudo phil`

3. Increase server security using public key authentication

First, generate a new key pair:
`ssh-keygen -t ed25519 -C "phil@email.com" -f "~/.ssh/digitalocean-key"`,
which generates a public key: `digitalocean-key.pub` and a private key: `digitalocean-key` located in `~/.ssh/` with encryption method of `ed25519`.

Second, copy the public key to from the local Mac to the remote server:
`ssh-copy-id -i ~/.ssh/digitalocean-key.pub phil@10.20.30.40`
using the created password for Phil. The `-i` flag specifies the public key file to be copied.

4. Disable password authentication at the start of this article

Now logged in as a user with `sudo` access, use
`sudo vim /etc/ssh/sshd_config`
to edit the configuration file. Uncomment the `PasswordAuthentication yes`, and change it to `PasswordAuthentication no`. Save and exit.

Lastly, reload SSH daemon by
`sudo systemctl reload sshd`

5. Test `ssh` logging

Now we can `ssh` to the remote server using only:
`ssh phil@10.20.30.40`

### Basic Firewall Setup

Install `ufw` to simplify the firewall setup process:
`sudo apt install ufw`.

Now check which apps `ufw` allows using:
`sudo ufw app list`
which should print out `Available applications OpenSSH`. Now we need to allow `ssh` connections so that we can log back in next time by:
`sudo ufw allow OpenSSH`.
Then enable the firewall by:
`sudo ufw enable`

Check the firewall status by:
`sudo ufw status`

## Configure the Domain Name

### Configure DNS (Domain Name System) on DigitalOcean

"Create" dropdown on the corner
--> "Domains/DNS"
--> "Add a Domain" with base only: taikonaut.com instead of www.taikonaut.com.
--> "Create new record" (add NameServer records for the domian on DigitalOcean servers)

Since we're only adding IPv4 addresses to the domain name for now (IPv6 for later tutorials), only A records need setup.

1. Hostname: @; Will direct to 10.20.30.40;
2. Hostname: www; Will direct to 10.20.30.40;

### Configure Our Domain Registrar to Direct Domain to DigitalOcean (Name.com as an example)

Go to "My Domains" and "Manage Nameservers", and edit the 4 existed records. Replace the nameserver with _ns1.digitalocean.com_, _ns2.digitalocean.com_, and _ns3.digitalocean.com_. Save it to apply the changes.

## Install and Configure Nginx

Logged in as user Phil, install ngix package by:
`sudo apt-get update && sudo apt-get install ngix`.

### Configure Firewall Settings

Check the `ufw` app list by:
`sudo ufw app list`
which will return "Available applications: Nginx Full/Nginx HTTP/Nginx HTTPS/OpenSSH".

For now, we can enable "Nginx HTTP" on port 80 by:
`sudo ufw allow 'Nginx HTTP'`
and check the status by:
`sudo ufw status`.

### Test the Web Server

Still in the remote terminal, use
`systemctl status nginx`
to check if the nginx service is running. If it is active, we can go to <http://10.20.30.40> to check it out!

## SSL Configuration Using `Let's Encrypt` and `Certbot`

### Update Nginx Configuration

Since `Certbot` can automatically configure `SSL` for `Nginx`, we need to set up the configuration file correctly beforehand:
`sudo vim /etc/nginx/sites-available/default`
and change the line with `server_name _` with `server_name taikonaut.com www.taikonaut.com` (your own domain here).
Save and verify there's not syntax error:
`sudo nginx -t`.
Lastly, reload `Nginx`:
`sudo systemctl reload nginx`

_Don't forget to allow HTTPS accesss in Firewall_

To allow both port 80 and port 443:
`sudo ufw allow 'Nginx Full'`

Then delete the redundant HTTP setting:
`sudo ufw delete allow 'Nginx HTTP'`

### Certbot Settings

Got to <https://certbot.eff.org/> on how to install `certbot`: check first "My HTTP website is running `Nginx` on Ubuntu 20.04 / Debian 10 / etc..." and follow the instructions. Some Linux distributions don't have `spand` preinstalled, so we have to manually install it by:
`sudo apt install snapd`.

Then ensure the version of snapd is up to date:
`sudo snap install core; sudo snap refresh core`

Remove certbot-auto and any Certbot OS packages:
`sudo apt-get remove certbot`

Then installl Certbot:
`sudo sanp install --classic certbot`

Prepare the Certbot command by linking:
`sudo ln -s /snap/bin/certbot /usr/bin/certbot`

Automatically configure `Nginx` to serve it by:
`sudo certbot --ngix`

Lastly, Test the automatic renewal by:
`sudo certbot renew --dry-run`

If all is set up correctly, go to <https://taikonaut.com> to look for a lock icon!

Also, test the SSL Server at <https://www.ssllabs.com/ssltest/>!

## Create and Deploy the Website

I'm mainly using `Gatsby` for development, so here I'll introduce how to deploy a `Gatsby` website to DigitalOcean.

First, ensure that `Node.js`, `npm`, and `Gatsby-CLI` are installed on remote server:

```bash
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install -g n
sudo n stable
hash nodejs
hash npm
sudo npm install -g gatsby-cli
```

Then, for easy deployment in the future, it's better to clone the repository to the remote server. Since by default, `Nginx` is configured to serve documents located at `/var/www/`, we need to `cd` into this folder and clone the repository: `git clone git@github.com:gatsby-repo.git`. Then `cd` into this folder and use:
`sudo npm install`
to install all the dependencies. Build the site by:
`sudo gatsby build`.

Reassign the ownership of the web directories to the normal user account without always `sudo`:
`sudo chown -R $USER:$USER /var/www/gatsby-repo/`,
then to make sure that the permissions fo the web roots folder is correct, use:
`sudo chmod -R 755 /var/www`.

To have Niginx serve this site, edit the `Nginx` config file:
`sudo vim /etc/nginx/sites-available/default`,
change the line of "root" inside "server" to `root /var/www/gatsby-repo/public`.
Then update the "server_name" to `server_name taikonaut.com www.taikonaut.com`.

Lastly, restart the `Nginx` service by:
`sudo systemctl restart nginx`.

Now, you can view the site live at <https://taikonaut.com> developed using `Gatsby`!

One more thing, if there's an update in the repo in the future, first `git pull` to update the project. Then run `sudo gatsby build` and the changes will be live!!

One last thing, my website is live at <https:taikonaut.studio>! Check it out!

## Resources

1. [Deploy a Create-React-App Website to DigitalOcean](https://coderrocketfuel.com/article/deploy-a-create-react-app-website-to-digitalocean)
2. [CertBot instructions](https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx)
3. [Deploy Gatsby to DigitalOcean](https://www.gatsbyjs.com/docs/deploying-to-digitalocean-droplet/)
4. [SSL Server Test](https://www.ssllabs.com/ssltest/)
5. [Point to DigitalOcean Nameservers form common domain registrars](https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars)
6. [Connecting to GitHub with `SSH`](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)
7. [HTTP to HTTPS](https://www.keycdn.com/blog/http-to-https)
