/* eslint-disable no-case-declarations */
/* eslint-disable prettier/prettier */
import mqtt, { IClientOptions } from 'mqtt'
import { SignInUserCommand } from '../../Application/Commands/SignInUserCommand';
import { SignUpUserCommand } from '../../Application/Commands/SignUpUserCommand';

export class MQTTController {

    constructor(private signInUserCommand: SignInUserCommand,
                private signUpUserCommand: SignUpUserCommand){}

    readonly options: IClientOptions = {
        port: 8883,
        host: '80a9b426b200440c81e9c17c2ba85bc2.s2.eu.hivemq.cloud',
        protocol: 'mqtts',
        username: 'gusreinaos',
        password: 'Mosquitto1204!'
    }

    readonly client = mqtt.connect(this.options);

    readonly authenticationRequest = 'authentication/#'

    readonly signInRequest = 'authentication/signIn/request'
    readonly signInResponse = 'authentication/signIn/response'

    readonly signUpRequest = 'authentication/signUp/request'
    readonly signUpResponse = 'authentication/signUp/response'

    readonly signOutRequest = 'authentication/signOut/request'
    readonly signOutResponse = 'authentication/signOut/response'

    readonly appointmentAuthRequest = 'authentication/appointment/request'
    readonly appointmentAuthResponse = 'authentication/appointment/response'

    appointment = '';
    public connect() {

        this.client.on('connect', () => {
            console.log('Client is connected to the internet');

            this.client.subscribe(this.authenticationRequest, {qos: 1})

            console.log('Client has subscribed successfully')

            this.client.on('message', (topic, message) => {
                if (topic === this.signInRequest){
                    const user = this.signInUserCommand.execute(message.toString())
                    this.client.publish(this.signInResponse, user.toString())
                }

                else if(topic === this.signUpRequest) {
                    const user = this.signUpUserCommand.execute(message.toString())
                    this.client.publish(this.signUpResponse, user.toString())
                }
            })
        })
    }
}
