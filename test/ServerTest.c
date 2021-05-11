// Server side C/C++ program to demonstrate Socket programming
#include <unistd.h>
#include <stdio.h>
#include <sys/socket.h>
#include <stdlib.h>
#include <netinet/in.h>
#include <string.h>
#include <time.h>
#define PORT 8080

struct packet_header
{
	u_int16_t flag;
	u_int16_t id_message;
	u_int8_t type;
	u_int16_t length;
	u_int16_t cs_header;
};


unsigned short csum(unsigned short *ptr,int nbytes)
{
	register long sum;
	unsigned short oddbyte;
	register short answer;

	sum=0;
	while(nbytes>1) {
		sum+=*ptr++;
		nbytes-=2;
	}
	if(nbytes==1) {
		oddbyte=0;
		*((u_char*)&oddbyte)=*(u_char*)ptr;
		sum+=oddbyte;
	}

	sum = (sum>>16)+(sum & 0xffff);
	sum = sum + (sum>>16);
	answer=(short)~sum;

	return(answer);
}
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
	struct packet_header head;
	int opt = 1;
	int addrlen = sizeof(address);
	char buffer[1024] = {0};
	char *hello = "Hello";
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
	  // original code
	//valread = read( new_socket , buffer, 1024);
    //recv(new_socket, buffer, sizeof buffer - 1, 0);
	//printf("%s\n",buffer );
	//send(new_socket,buffer,strlen(buffer),0);

	//loop for in messages
	while(1) {
	//read( new_socket , buffer, 1024);
	valread = read( new_socket , buffer, 1024);
	//printf("%i",valread);
    send(new_socket,buffer,strlen(buffer),0);
    //memset(buffer, 0, sizeof buffer);
     //random relevés

    int temp = (rand() % (37 + 1 - 20 )) + 20;
    int rp = (rand() % (101 - 20) + 20);
    char *str;
    sprintf(str,"{\"rp\":%d,\"US\":20,\"IS\":10,\"temp\":%d}",rp,temp);
    head.flag = 0xA55A;
    head.id_message = buffer[5] + 1;
    head.type = 0x01;
    head.length = sizeof(str);
    head.cs_header = csum ((unsigned short *) head, *head->length);
    ptr = malloc(sizeof ( struct packet_header));
    ptr = (struct packet_header *) head;
    unsigned short cs = csum((unsigned short *) str, sizeof(str) );
    buffer[0] = ptr;
    buffer[1] = str;
    buffer[2] = cs & 0xFF;
    send(new_socket, buffer, strlen(buffer), 0);
    /*
            if ( strcmp(buffer,c) == 10){
                close(new_socket);
                printf("client déconnecté");
                return 0;
            }
	send(new_socket,buffer,strlen(buffer),0);
        if ( strcmp(buffer,c) == 10){
            close(new_socket);
            printf("client déconnecté");
            return 0;
        }*/
    delay(1000);
	}
	//send(new_socket , hello , strlen(hello) , 0 );
	//printf("Hello message sent\n");
	close(new_socket);
	close(server_fd);
	return 0;
}
