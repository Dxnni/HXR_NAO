import argparse

def get_tts_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('-t','--text',help="Set text to be spoken. Put double quotations around text",default="Give me something to say")
    parser.add_argument('-p','--pitch',help="Set voice pitch. Range is [1.0-4]",type=float,default=1.0)
    parser.add_argument('-ss','--speed',help='Set speech speed. Range is [50-100]',type=float,default=100)
    parser.add_argument('-vol','--volume',help="Set volume. Range is [0-1.0]",type=float,default=1.0)
    parser.add_argument('--ip',help ='Set IP address',default="10.0.1.19")
    return parser

def get_posture_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('--posture',help="Set posture for robot to perform",default="StandInit")
    parser.add_argument('--ip',help ='Set IP address',default="10.0.1.19")
    return parser

def get_base_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('--ip',help ='Set IP address',default="10.0.1.19")
    return parser

def get_full_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('--ip',help ='Set IP address',default="10.0.1.19")
    parser.add_argument('--secs',help ='Set # of secs for action',type=float,default=5)
    parser.add_argument('--posture',help="Set posture for robot to perform",default="StandInit")
    parser.add_argument('--text',help="Set text to be spoken (TTS). Put double quotations around text",default="Give me something to say")
    parser.add_argument('--volume',help="Set volume (TTS). Range is [0-1.0]",type=float,default=1.0)
    parser.add_argument('--pitch',help="Set voice pitch (TTS). Range is [1.0-4]",type=float,default=1.0)
    parser.add_argument('--speed',help='Set speech speed (TTS). Range is [50-100]',type=float,default=100)    
    return parser