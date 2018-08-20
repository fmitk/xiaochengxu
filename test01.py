from app import Panos

def panoInfo():

    panos=Panos.query.all()
    panoInfos=[]
    for pano in panos:
        panoInfo={
            "panoid":pano.panoid,
            "title":pano.title,
            "panolink":pano.panolink,
            "author":pano.author,
            "uploadtime":pano.uploadtime
        }
        panoInfos.append(panoInfo)
    return jsonify(panoInfos)
