// Server side C/C++ program to demonstrate Socket programming
#include <unistd.h>
#include <stdio.h>
#include <sys/socket.h>
#include <stdlib.h>
#include <netinet/in.h>
#include <string.h>
#include <time.h>
#define PORT 8080

void delay(int number_of_seconds)
{
    // Converting time into milli_seconds
    int milli_seconds = 1000 * number_of_seconds;

    // Storing start time
    clock_t start_time = clock();

    // looping till required time is not achieved
    while (clock() < start_time + milli_seconds)
        ;
}

int main(int argc, char const *argv[])
{
	int server_fd, new_socket, valread;
	struct sockaddr_in address;
	int opt = 1;
	int addrlen = sizeof(address);
	char buffer[1024] = {0};
	char *hello = "Hello";
	char *c = "close";
	char *e1 = "{\"code\":2,\"msg\":\"une erreur est survenue.\"}";
    int i = 0;
	// Creating socket file descriptor
	if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0)
	{
		perror("socket failed");
		exit(EXIT_FAILURE);
	}

	// Forcefully attaching socket to the port 8080
	if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR , &opt, sizeof(opt)))
	{
		perror("setsockopt");
		exit(EXIT_FAILURE);
	}
	address.sin_family = AF_INET;
	address.sin_addr.s_addr = INADDR_ANY;
	address.sin_port = htons( PORT );

	// Forcefully attaching socket to the port 8080
	if (bind(server_fd, (struct sockaddr *)&address,
								sizeof(address))<0)
	{
		perror("bind failed");
		exit(EXIT_FAILURE);
	}
	if (listen(server_fd, 3) < 0)
	{
		perror("listen");
		exit(EXIT_FAILURE);
	}
	if ((new_socket = accept(server_fd, (struct sockaddr *)&address,
					(socklen_t*)&addrlen))<0)
	{
		perror("accept");
		exit(EXIT_FAILURE);
	}
	/*
	valread = read( new_socket , buffer, 1024);
	printf("%s\n",buffer );
	send(new_socket,buffer,strlen(buffer),0);*/
	while(1) {
	read( new_socket , buffer, 1024);
	printf("%s",buffer);
    send(new_socket,buffer,strlen(buffer),0);
    memset(buffer, 0, sizeof buffer);
    /*
    //random relevés
    int temp = (rand() % (37 + 1 - 20 )) + 20;
    int rp = (rand() % (101 - 20) + 20);
    char *rlv = "{\"rp\":5,\"rg\":7,\"UE\":20, \"IE\":10,\"US\":20,\"IS\":10,\"temp\"";
    char str[255];
    //printf(str,"%s { \"temp\" :%d }",rlv,temp);
    sprintf(str,"{\"rp\":%d,\"rg\":%d,\"UE\":20, \"IE\":10,\"US\":20,\"IS\":10,\"temp\":%d}",rp,rp,temp);
    send(new_socket, str, strlen(str), 0);
    //send(new_socket , rlv , strlen(rlv) , 0 );
    delay(1000);
            if ( strcmp(buffer,c) == 10){
                close(new_socket);
                printf("client déconnecté");
                return 0;
            }
    //close(new_socket);
	send(new_socket,buffer,strlen(buffer),0);
        if ( strcmp(buffer,c) == 10){
            close(new_socket);
            printf("client déconnecté");
            return 0;
        }
        //if (strcmp(buffer,))
	   // char *rlv = "{\"code\":0,\"msg\": {\"rp\":5,\"rg\":7,\"UE\":20, \"IE\":10,\"US\":20,\"IS\":10,\"temp\":25}}";
	    //send(new_socket , rlv , strlen(rlv) , 0 );*/
	    delay(1000);
	}
	//send(new_socket , hello , strlen(hello) , 0 );
	//printf("Hello message sent\n");
	close(new_socket);
	close(server_fd);
	return 0;
}
