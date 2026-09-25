"""Render blog figures from ChainSWE v2 Tables 2 and 3. Requires matplotlib."""
from pathlib import Path
import csv
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import LinearSegmentedColormap, TwoSlopeNorm

OUT = Path(__file__).resolve().parents[1] / 'public/blog/from-execution-to-selection'
OUT.mkdir(parents=True, exist_ok=True)
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':12,'axes.spines.top':False,'axes.spines.right':False,'axes.edgecolor':'#d5dce5','axes.labelcolor':'#536170','xtick.color':'#536170','ytick.color':'#536170','text.color':'#1c2429','svg.fonttype':'none'})
series = {
 'Baseline': {'Oracle':[58.6,64.3,67.0], 'Seq':[57.1,39.3,27.7], 'Seq+Mem':[56.5,38.0,28.2]},
 'Summarize': {'Oracle':[58.0,66.0,68.4], 'Seq':[60.0,35.4,20.6], 'Seq+Mem':[59.3,36.6,22.0]},
 'Sub-Agent': {'Oracle':[49.5,58.1,59.2], 'Seq':[50.3,29.9,17.5], 'Seq+Mem':[50.4,31.3,19.2]},
}
colors={'Oracle':'#2459d5','Seq':'#b05c3b','Seq+Mem':'#758394'}
styles={'Oracle':('-', 'o'),'Seq':('-', 's'),'Seq+Mem':('--', '^')}
fig, axes = plt.subplots(3,1,figsize=(7.4,9.7),sharex=True,sharey=True)
fig.subplots_adjust(left=.13,right=.88,top=.815,bottom=.105,hspace=.48)
fig.text(.055,.955,'When prior edits become the next starting point',fontsize=17,fontweight='bold')
fig.text(.055,.918,'ChainSWE · Resolution rate by position in the bug chain',fontsize=12,color='#616d78')
for ax,(configuration,modes) in zip(axes,series.items()):
    ax.set_title(configuration,loc='left',fontsize=13,fontweight='bold',pad=9)
    ax.set_ylim(0,80); ax.set_xlim(.9,3.25); ax.set_yticks([0,20,40,60,80]); ax.grid(axis='y',color='#e8ecf1'); ax.set_axisbelow(True)
    for name,values in modes.items():
        line,marker=styles[name]
        ax.plot([1,2,3],values,label=name,color=colors[name],linestyle=line,marker=marker,linewidth=2.4,markersize=6)
        y=values[-1]+(4 if name=='Seq+Mem' else -4 if name=='Seq' else 0)
        ax.text(3.07,y,f'{values[-1]:.1f}',color=colors[name],fontsize=11,va='center',fontweight='bold')
    ax.set_ylabel('Resolved (%)',fontsize=11)
axes[-1].set_xticks([1,2,3],['First bug','Second bug','Third bug'])
handles,labels=axes[0].get_legend_handles_labels()
fig.legend(handles,labels,loc='upper left',bbox_to_anchor=(.05,.895),ncol=3,frameon=False,fontsize=11)
fig.text(.055,.035,'97 three-bug chains · Mean across 7 models\nSource: ChainSWE v2, Table 3 · Redrawn from reported data',fontsize=10,color='#616d78',linespacing=1.6)
fig.savefig(OUT/'chainswe-by-position.png',dpi=200,facecolor='white'); plt.close(fig)

# Each row: Baseline, Summarize, Sub-Agent. Values are per-bug resolution (%).
values={
 'GPT-5.5':([49.0,42.4,35.2],[47.4,49.7,43.4]),
 'GPT-5.4-mini':([41.8,39.8,21.7],[41.8,37.8,22.0]),
 'GPT-5.4-nano':([45.1,33.9,23.0],[44.1,35.5,18.1]),
 'Claude-Opus-4.7':([40.5,39.5,38.0],[39.5,41.5,40.0]),
 'Claude-Opus-4.5':([43.0,40.5,38.5],[37.5,40.0,40.0]),
 'DeepSeek-V4-Pro':([29.6,27.3,25.0],[28.6,26.0,28.0]),
 'Gemini-3.1-Pro':([36.5,39.5,37.2],[37.5,39.8,37.2]),
}
delta=np.array([np.array(mem)-np.array(seq) for seq,mem in values.values()])
fig, ax=plt.subplots(figsize=(7.4,6.3)); fig.subplots_adjust(left=.31,right=.95,top=.78,bottom=.21)
cmap=LinearSegmentedColormap.from_list('memory',['#ae5539','#fafbfc','#2459d5'])
im=ax.imshow(delta,cmap=cmap,norm=TwoSlopeNorm(vmin=-8.5,vcenter=0,vmax=8.5),aspect='auto')
ax.set_xticks(range(3),list(series),fontsize=11); ax.xaxis.tick_top(); ax.tick_params(axis='both',length=0,pad=10)
ax.set_yticks(range(7),list(values),fontsize=11)
for i in range(7):
    for j in range(3):
        ax.text(j,i,f'{delta[i,j]:+.1f}' if delta[i,j] else '0.0',ha='center',va='center',fontsize=14,fontweight='bold',color='white' if abs(delta[i,j])>4.5 else '#1c2429')
for spine in ax.spines.values():spine.set_visible(False)
fig.text(.055,.945,'Preserving history is not a uniform gain',fontsize=17,fontweight='bold')
fig.text(.055,.905,'Seq+Mem minus Seq · Percentage-point change in resolution',fontsize=11.5,color='#616d78')
cax=fig.add_axes([.31,.145,.64,.026]); cb=fig.colorbar(im,cax=cax,orientation='horizontal',ticks=[-8,0,8]); cb.outline.set_visible(False); cb.ax.tick_params(labelsize=10,length=0)
fig.text(.055,.035,'100 chains / 304 bugs · Source: ChainSWE v2, Table 2\nDifferences computed from reported rounded percentages.',fontsize=10,color='#616d78',linespacing=1.6)
fig.savefig(OUT/'chainswe-memory-effect.png',dpi=200,facecolor='white');plt.close(fig)
with (OUT/'chainswe-data.csv').open('w',newline='') as f:
    w=csv.writer(f);w.writerow(['source','model','configuration','mode','position','resolved_percent'])
    for config,modes in series.items():
        for mode,ys in modes.items():
            for pos,y in enumerate(ys,1):w.writerow(['Table 3','7-model mean',config,mode,pos,y])
    for model,(seq,mem) in values.items():
        for j,config in enumerate(series):
            for mode,ys in [('Seq',seq),('Seq+Mem',mem)]:w.writerow(['Table 2',model,config,mode,'all',ys[j]])
print('Rendered 2 charts and their source data.')
