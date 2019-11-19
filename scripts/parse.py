import argparse



def get_tts_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('-t','--text',help=" Text to be turn to speech. Put double quotations around text",default=None)
    parser.add_argument('-vol','--volume',help="Output Volume for speakers. Range",type=float,default=None)
    parser.add_argument('-p','--pitch',help="Set voice pitch. Range is [1.0-4]",type=float,default=None)
    parser.add_argument('-ss','--speed',help='Set speech speed. Range is [50-100]',type=float,default=None)
    parser.add_argument('--ip',help ='set IP address',default="10.0.1.19")
    return parser

def get_posture_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('--posture',help="posture Name",default="Stand")
    parser.add_argument('--ip',help ='set IP address',default="10.0.1.19")
    return parser

def get_base_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('--ip',help ='set IP address',default="10.0.1.19")
    return parser
